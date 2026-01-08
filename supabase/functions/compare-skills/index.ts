const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface MarketSkill {
  skill: string;
  count: number;
  percentage: number;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { studentSkills, dreamJob } = await req.json();
    
    if (!Array.isArray(studentSkills)) {
      return new Response(
        JSON.stringify({ error: 'Invalid student skills' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Comparing skills against market data...');

    // If dream job is provided, get job-specific skills instead of market data
    let marketData: Map<string, number>;
    
    if (dreamJob) {
      console.log(`Using job-specific skills for: ${dreamJob}`);
      
      // Call get-job-skills function
      const jobSkillsUrl = `${Deno.env.get('SUPABASE_URL')}/functions/v1/get-job-skills`;
      const jobSkillsResponse = await fetch(jobSkillsUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': req.headers.get('Authorization') || ''
        },
        body: JSON.stringify({ dreamJob })
      });
      
      if (jobSkillsResponse.ok) {
        const jobData = await jobSkillsResponse.json();
        marketData = new Map();
        
        // Assign equal weight to all job-required skills
        jobData.skills.forEach((skill: string) => {
          marketData.set(skill.toLowerCase(), 100);
        });
      } else {
        // Fallback to CSV data
        marketData = await loadMarketData();
      }
    } else {
      // Load and parse market skills CSV
      marketData = await loadMarketData();
    }

    const totalJobs = 1491; // From your CSV
    const studentSkillSet = new Set(studentSkills.map((s: string) => s.toLowerCase()));

    // Find skills in demand
    const marketSkills: MarketSkill[] = [];
    for (const [skill, count] of marketData.entries()) {
      marketSkills.push({
        skill,
        count,
        percentage: Math.round((count / totalJobs) * 100)
      });
    }

    // Sort by demand
    marketSkills.sort((a, b) => b.count - a.count);

    // Find gaps (top market skills not in student's skillset)
    const skillGaps = marketSkills
      .filter(ms => !studentSkillSet.has(ms.skill.toLowerCase()))
      .slice(0, 10);

    // Calculate match metrics
    const topMarketSkills = marketSkills.slice(0, 20);
    const matchedCount = topMarketSkills.filter(ms => 
      studentSkillSet.has(ms.skill.toLowerCase())
    ).length;

    const matchPercentage = Math.round((matchedCount / topMarketSkills.length) * 100);
    const marketReadiness = Math.min(95, matchPercentage + (studentSkills.length > 15 ? 10 : 0));

    // Create comparison data for chart - using real binary data (have skill = 100%, don't have = 0%)
    const chartData = topMarketSkills.slice(0, 10).map(ms => ({
      skill: ms.skill,
      hasSkill: studentSkillSet.has(ms.skill.toLowerCase()),
      marketDemand: ms.percentage,
      count: ms.count
    }));

    console.log(`Analysis complete: ${matchPercentage}% match, ${skillGaps.length} gaps`);

    return new Response(
      JSON.stringify({
        matchPercentage,
        marketReadiness,
        criticalGaps: skillGaps.length,
        skillGaps,
        chartData,
        totalMarketSkills: marketSkills.length,
        studentSkillCount: studentSkills.length
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in compare-skills:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function loadMarketData(): Promise<Map<string, number>> {
  const csvUrl = `${Deno.env.get('SUPABASE_URL')?.replace('/rest/v1', '')}/storage/v1/object/public/transcripts/market_skills.csv`;
  
  try {
    const csvResponse = await fetch(csvUrl);
    if (!csvResponse.ok) {
      return getFallbackMarketData();
    }
    const csvText = await csvResponse.text();
    return parseMarketSkills(csvText);
  } catch (e) {
    console.error('Error loading market data:', e);
    return getFallbackMarketData();
  }
}

function getFallbackMarketData(): Map<string, number> {
  return new Map([
    ["react", 450], ["javascript", 520], ["python", 380], ["java", 290],
    ["sql", 410], ["docker", 220], ["aws", 310], ["git", 480],
    ["typescript", 340], ["node.js", 280], ["communication", 560],
    ["teamwork", 490], ["agile", 310], ["api", 390], ["testing", 270]
  ]);
}

function parseMarketSkills(csvText: string): Map<string, number> {
  const skills = new Map<string, number>();
  const lines = csvText.split('\n').slice(1); // Skip header
  
  for (const line of lines) {
    if (!line.trim()) continue;
    
    // Extract skills column (2nd column)
    const match = line.match(/"([^"]+)"/);
    if (match && match[1]) {
      const skillsList = match[1].split(',').map(s => s.trim().toLowerCase());
      for (const skill of skillsList) {
        if (skill) {
          skills.set(skill, (skills.get(skill) || 0) + 1);
        }
      }
    }
  }
  
  return skills;
}
