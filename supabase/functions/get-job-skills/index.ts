const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Job-specific skill requirements
const JOB_SKILLS: Record<string, string[]> = {
  "full stack developer": [
    "javascript", "typescript", "react", "node.js", "express", "sql", "nosql", 
    "html/css", "git", "api", "testing", "devops", "docker", "aws", "communication"
  ],
  "frontend developer": [
    "javascript", "typescript", "react", "angular", "vue", "html/css", 
    "ui/ux", "responsive design", "git", "testing", "communication"
  ],
  "backend developer": [
    "java", "python", "node.js", "sql", "nosql", "api", "microservices",
    "docker", "cloud computing", "testing", "git", "devops"
  ],
  "mobile developer": [
    "javascript", "react native", "android", "ios", "swift", "kotlin",
    "mobile development", "ui/ux", "git", "testing", "api"
  ],
  "devops engineer": [
    "docker", "kubernetes", "aws", "azure", "cloud computing", "ci/cd",
    "linux", "git", "python", "bash", "monitoring", "networking"
  ],
  "data scientist": [
    "python", "machine learning", "statistics", "sql", "pandas", "numpy",
    "deep learning", "data visualization", "jupyter", "git", "communication"
  ],
  "machine learning engineer": [
    "python", "machine learning", "deep learning", "tensorflow", "pytorch",
    "nlp", "computer vision", "sql", "cloud computing", "git", "mathematics"
  ],
  "ai engineer": [
    "python", "artificial intelligence", "machine learning", "deep learning",
    "nlp", "computer vision", "tensorflow", "pytorch", "mathematics", "git"
  ],
  "cloud architect": [
    "aws", "azure", "cloud computing", "docker", "kubernetes", "networking",
    "security", "devops", "architecture", "communication"
  ],
  "security engineer": [
    "information security", "network security", "cybersecurity", "penetration testing",
    "cryptography", "linux", "networking", "python", "scripting"
  ],
  "game developer": [
    "c++", "c#", "unity", "unreal", "game development", "3d graphics",
    "physics", "oop", "git", "problem solving"
  ],
  "ui/ux designer": [
    "ui/ux", "figma", "adobe xd", "user research", "prototyping",
    "html/css", "javascript", "communication", "design thinking"
  ],
  "qa engineer": [
    "testing", "automation", "selenium", "java", "python", "api testing",
    "sql", "git", "agile", "communication"
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
    const skills = JOB_SKILLS[jobKey] || JOB_SKILLS["full stack developer"]; // Fallback

    console.log(`Retrieved ${skills.length} skills for ${dreamJob}`);

    return new Response(
      JSON.stringify({ 
        skills,
        count: skills.length,
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