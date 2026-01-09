const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Job-specific skill requirements with importance levels (percentage of job postings requiring this skill)
const JOB_SKILLS: Record<string, { skill: string; importance: number }[]> = {
  "full stack developer": [
    { skill: "javascript", importance: 95 },
    { skill: "react", importance: 85 },
    { skill: "node.js", importance: 80 },
    { skill: "typescript", importance: 75 },
    { skill: "sql", importance: 70 },
    { skill: "git", importance: 90 },
    { skill: "html/css", importance: 85 },
    { skill: "api", importance: 75 },
    { skill: "docker", importance: 45 },
    { skill: "aws", importance: 40 },
    { skill: "testing", importance: 55 },
    { skill: "communication", importance: 60 },
    { skill: "express", importance: 50 },
    { skill: "nosql", importance: 35 },
    { skill: "devops", importance: 30 }
  ],
  "frontend developer": [
    { skill: "javascript", importance: 95 },
    { skill: "react", importance: 90 },
    { skill: "html/css", importance: 95 },
    { skill: "typescript", importance: 70 },
    { skill: "git", importance: 85 },
    { skill: "responsive design", importance: 80 },
    { skill: "ui/ux", importance: 65 },
    { skill: "vue", importance: 35 },
    { skill: "angular", importance: 30 },
    { skill: "testing", importance: 50 },
    { skill: "communication", importance: 55 }
  ],
  "backend developer": [
    { skill: "java", importance: 60 },
    { skill: "python", importance: 55 },
    { skill: "sql", importance: 90 },
    { skill: "api", importance: 85 },
    { skill: "node.js", importance: 50 },
    { skill: "git", importance: 85 },
    { skill: "docker", importance: 60 },
    { skill: "microservices", importance: 45 },
    { skill: "cloud computing", importance: 50 },
    { skill: "testing", importance: 55 },
    { skill: "nosql", importance: 40 },
    { skill: "devops", importance: 35 }
  ],
  "mobile developer": [
    { skill: "react native", importance: 55 },
    { skill: "javascript", importance: 70 },
    { skill: "swift", importance: 45 },
    { skill: "kotlin", importance: 40 },
    { skill: "ios", importance: 50 },
    { skill: "android", importance: 55 },
    { skill: "git", importance: 80 },
    { skill: "ui/ux", importance: 60 },
    { skill: "api", importance: 70 },
    { skill: "testing", importance: 50 },
    { skill: "mobile development", importance: 85 }
  ],
  "devops engineer": [
    { skill: "docker", importance: 90 },
    { skill: "kubernetes", importance: 75 },
    { skill: "aws", importance: 80 },
    { skill: "linux", importance: 85 },
    { skill: "ci/cd", importance: 85 },
    { skill: "git", importance: 80 },
    { skill: "python", importance: 55 },
    { skill: "bash", importance: 70 },
    { skill: "azure", importance: 45 },
    { skill: "monitoring", importance: 60 },
    { skill: "networking", importance: 50 },
    { skill: "cloud computing", importance: 75 }
  ],
  "data scientist": [
    { skill: "python", importance: 95 },
    { skill: "machine learning", importance: 85 },
    { skill: "sql", importance: 75 },
    { skill: "statistics", importance: 80 },
    { skill: "pandas", importance: 70 },
    { skill: "data visualization", importance: 65 },
    { skill: "numpy", importance: 60 },
    { skill: "deep learning", importance: 45 },
    { skill: "jupyter", importance: 50 },
    { skill: "git", importance: 55 },
    { skill: "communication", importance: 60 }
  ],
  "machine learning engineer": [
    { skill: "python", importance: 95 },
    { skill: "machine learning", importance: 95 },
    { skill: "deep learning", importance: 75 },
    { skill: "tensorflow", importance: 60 },
    { skill: "pytorch", importance: 55 },
    { skill: "sql", importance: 50 },
    { skill: "git", importance: 70 },
    { skill: "cloud computing", importance: 55 },
    { skill: "nlp", importance: 40 },
    { skill: "computer vision", importance: 35 },
    { skill: "mathematics", importance: 65 }
  ],
  "ai engineer": [
    { skill: "python", importance: 95 },
    { skill: "machine learning", importance: 90 },
    { skill: "deep learning", importance: 80 },
    { skill: "artificial intelligence", importance: 85 },
    { skill: "tensorflow", importance: 55 },
    { skill: "pytorch", importance: 50 },
    { skill: "nlp", importance: 50 },
    { skill: "computer vision", importance: 40 },
    { skill: "git", importance: 65 },
    { skill: "mathematics", importance: 60 }
  ],
  "cloud architect": [
    { skill: "aws", importance: 85 },
    { skill: "azure", importance: 60 },
    { skill: "cloud computing", importance: 95 },
    { skill: "docker", importance: 70 },
    { skill: "kubernetes", importance: 65 },
    { skill: "architecture", importance: 85 },
    { skill: "networking", importance: 70 },
    { skill: "security", importance: 65 },
    { skill: "devops", importance: 55 },
    { skill: "communication", importance: 60 }
  ],
  "security engineer": [
    { skill: "information security", importance: 90 },
    { skill: "cybersecurity", importance: 85 },
    { skill: "network security", importance: 75 },
    { skill: "linux", importance: 70 },
    { skill: "python", importance: 55 },
    { skill: "penetration testing", importance: 50 },
    { skill: "networking", importance: 65 },
    { skill: "cryptography", importance: 40 },
    { skill: "scripting", importance: 50 }
  ],
  "game developer": [
    { skill: "c++", importance: 75 },
    { skill: "c#", importance: 70 },
    { skill: "unity", importance: 65 },
    { skill: "unreal", importance: 45 },
    { skill: "game development", importance: 90 },
    { skill: "3d graphics", importance: 55 },
    { skill: "oop", importance: 60 },
    { skill: "git", importance: 65 },
    { skill: "physics", importance: 35 },
    { skill: "problem solving", importance: 70 }
  ],
  "ui/ux designer": [
    { skill: "figma", importance: 90 },
    { skill: "ui/ux", importance: 95 },
    { skill: "user research", importance: 70 },
    { skill: "prototyping", importance: 75 },
    { skill: "adobe xd", importance: 45 },
    { skill: "html/css", importance: 50 },
    { skill: "design thinking", importance: 60 },
    { skill: "communication", importance: 65 },
    { skill: "javascript", importance: 30 }
  ],
  "qa engineer": [
    { skill: "testing", importance: 95 },
    { skill: "automation", importance: 80 },
    { skill: "selenium", importance: 60 },
    { skill: "sql", importance: 55 },
    { skill: "api testing", importance: 70 },
    { skill: "git", importance: 65 },
    { skill: "java", importance: 45 },
    { skill: "python", importance: 40 },
    { skill: "agile", importance: 60 },
    { skill: "communication", importance: 55 }
  ]
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { dreamJob } = await req.json();
    
    if (!dreamJob || typeof dreamJob !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Invalid dream job' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const jobKey = dreamJob.toLowerCase();
    const skillsData = JOB_SKILLS[jobKey] || JOB_SKILLS["full stack developer"]; // Fallback

    console.log(`Retrieved ${skillsData.length} skills for ${dreamJob}`);

    return new Response(
      JSON.stringify({ 
        skills: skillsData, // Now includes { skill, importance } objects
        count: skillsData.length,
        job: dreamJob
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in get-job-skills:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});