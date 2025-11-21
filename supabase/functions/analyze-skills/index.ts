import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Skill mapping dictionary (simplified from your Python config)
const SKILL_MAPPING: Record<string, string[]> = {
  "python": ["python", "py", "pandas", "numpy", "scikit-learn", "pytorch", "tensorflow"],
  "java": ["java", "java core", "j2ee", "spring", "spring boot", "hibernate"],
  "javascript": ["javascript", "js", "es6", "typescript", "node.js", "nodejs", "express"],
  "react": ["react", "reactjs", "react.js", "react native", "redux", "next.js"],
  "angular": ["angular", "angularjs"],
  "vue": ["vue", "vuejs", "vue.js", "nuxt.js"],
  "c#": ["c#", ".net", ".net core", "asp.net", "entity framework"],
  "sql": ["sql", "t-sql", "pl/sql", "mysql", "postgresql", "sql server"],
  "mongodb": ["mongodb", "mongo"],
  "docker": ["docker", "kubernetes", "k8s"],
  "aws": ["aws", "amazon web services", "cloud", "azure", "gcp"],
  "git": ["git", "github", "gitlab"],
  "agile": ["agile", "scrum", "kanban"],
  "testing": ["testing", "qa", "qc", "unit test", "integration test"],
  "api": ["api", "rest", "restful", "graphql"],
  "communication": ["communication", "giao tiếp"],
  "teamwork": ["teamwork", "làm việc nhóm"],
  "problem solving": ["problem solving", "giải quyết vấn đề"],
  "leadership": ["leadership", "lãnh đạo"],
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { transcriptText } = await req.json();
    
    if (!transcriptText || typeof transcriptText !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Invalid transcript text' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Analyzing transcript with AI...');
    
    // Use Lovable AI to extract skills from transcript
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are a skill extraction assistant. Extract technical skills, soft skills, and competencies from academic transcripts or resumes. Return ONLY a JSON array of skill names in lowercase. Focus on: programming languages, frameworks, tools, methodologies, soft skills, and technical competencies. Example: ["python", "react", "communication", "teamwork"]`
          },
          {
            role: 'user',
            content: `Extract all skills from this transcript:\n\n${transcriptText}`
          }
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI gateway error:', aiResponse.status, errorText);
      throw new Error(`AI analysis failed: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    let extractedSkills: string[] = [];
    
    try {
      const content = aiData.choices[0]?.message?.content || '[]';
      extractedSkills = JSON.parse(content);
    } catch (e) {
      console.error('Failed to parse AI response:', e);
      // Fallback: try to extract skills from raw text
      const skillPattern = /\b(python|java|javascript|react|angular|vue|sql|docker|aws|git)\b/gi;
      extractedSkills = [...new Set((transcriptText.match(skillPattern) || []).map(s => s.toLowerCase()))];
    }

    // Normalize skills using mapping
    const normalizedSkills = new Set<string>();
    for (const skill of extractedSkills) {
      const skillLower = skill.toLowerCase().trim();
      let matched = false;
      
      for (const [standardSkill, variations] of Object.entries(SKILL_MAPPING)) {
        if (variations.some(v => skillLower.includes(v) || v.includes(skillLower))) {
          normalizedSkills.add(standardSkill);
          matched = true;
          break;
        }
      }
      
      if (!matched && skillLower.length > 2) {
        normalizedSkills.add(skillLower);
      }
    }

    console.log('Extracted skills:', Array.from(normalizedSkills));

    return new Response(
      JSON.stringify({ 
        skills: Array.from(normalizedSkills),
        count: normalizedSkills.size 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-skills:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
