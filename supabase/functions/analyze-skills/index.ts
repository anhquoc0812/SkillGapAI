const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Comprehensive skill mapping including IT curriculum subjects
const SKILL_MAPPING: Record<string, string[]> = {
  // Programming Languages
  "c/c++": ["c++", "c", "cpp", "c programming", "c language", "lập trình c"],
  "java": ["java", "java core", "j2ee", "spring", "spring boot", "hibernate", "lập trình java"],
  "python": ["python", "py", "pandas", "numpy", "scikit-learn", "pytorch", "tensorflow", "lập trình python"],
  "javascript": ["javascript", "js", "es6", "typescript", "node.js", "nodejs", "express", "lập trình javascript"],
  "c#": ["c#", "csharp", ".net", ".net core", "asp.net", "entity framework"],
  "php": ["php", "laravel", "symfony", "lập trình php"],
  "go": ["go", "golang"],
  "rust": ["rust"],
  "swift": ["swift", "swiftui"],
  "kotlin": ["kotlin"],
  
  // Web Development
  "html/css": ["html", "css", "html5", "css3", "sass", "scss", "thiết kế web"],
  "react": ["react", "reactjs", "react.js", "react native", "redux", "next.js"],
  "angular": ["angular", "angularjs"],
  "vue": ["vue", "vuejs", "vue.js", "nuxt.js"],
  "frontend": ["frontend", "front-end", "ui development", "giao diện người dùng"],
  "backend": ["backend", "back-end", "server-side", "phát triển backend"],
  "fullstack": ["fullstack", "full-stack", "full stack"],
  
  // Mobile Development
  "android": ["android", "android studio", "android development", "lập trình android"],
  "ios": ["ios", "ios development", "xcode", "lập trình ios"],
  "mobile": ["mobile", "mobile app", "app development", "ứng dụng di động"],
  "flutter": ["flutter", "dart"],
  
  // Database & Data
  "sql": ["sql", "t-sql", "pl/sql", "mysql", "postgresql", "sql server", "cơ sở dữ liệu"],
  "nosql": ["nosql", "mongodb", "mongo", "cassandra", "redis"],
  "database design": ["database design", "data modeling", "er diagram", "thiết kế csdl"],
  "data structures": ["data structures", "cấu trúc dữ liệu", "dsa", "ctdl"],
  "algorithms": ["algorithms", "thuật toán", "algorithm design", "giải thuật"],
  "big data": ["big data", "hadoop", "spark", "dữ liệu lớn"],
  "data analysis": ["data analysis", "phân tích dữ liệu", "analytics"],
  
  // AI & Machine Learning
  "machine learning": ["machine learning", "ml", "học máy", "supervised learning"],
  "deep learning": ["deep learning", "học sâu", "neural network", "mạng nơ-ron"],
  "artificial intelligence": ["ai", "artificial intelligence", "trí tuệ nhân tạo"],
  "nlp": ["nlp", "natural language processing", "xử lý ngôn ngữ tự nhiên"],
  "computer vision": ["computer vision", "thị giác máy tính", "image processing", "opencv"],
  
  // Software Engineering
  "software engineering": ["software engineering", "công nghệ phần mềm", "sdlc"],
  "oop": ["oop", "object oriented", "lập trình hướng đối tượng", "hướng đối tượng"],
  "design patterns": ["design patterns", "mvc", "mvvm", "mẫu thiết kế"],
  "software architecture": ["software architecture", "kiến trúc phần mềm", "system design"],
  "testing": ["testing", "qa", "qc", "unit test", "kiểm thử", "kiểm thử phần mềm"],
  "requirements analysis": ["requirements", "phân tích yêu cầu", "yêu cầu phần mềm"],
  
  // DevOps & Cloud
  "git": ["git", "github", "gitlab", "version control", "quản lý phiên bản"],
  "docker": ["docker", "containerization", "containers"],
  "kubernetes": ["kubernetes", "k8s"],
  "ci/cd": ["ci/cd", "continuous integration", "jenkins", "tích hợp liên tục"],
  "aws": ["aws", "amazon web services", "cloud", "ec2", "s3"],
  "azure": ["azure", "microsoft azure"],
  "gcp": ["gcp", "google cloud"],
  "devops": ["devops", "sre"],
  
  // Computer Science Fundamentals
  "operating systems": ["operating systems", "os", "linux", "unix", "hệ điều hành"],
  "computer networks": ["networking", "network", "tcp/ip", "mạng máy tính"],
  "computer architecture": ["computer architecture", "kiến trúc máy tính", "hardware"],
  "discrete math": ["discrete math", "toán rời rạc", "logic", "graph theory"],
  "linear algebra": ["linear algebra", "đại số tuyến tính", "matrix"],
  "calculus": ["calculus", "giải tích", "mathematics"],
  "statistics": ["statistics", "xác suất thống kê", "probability"],
  "logic": ["logic", "toán logic", "propositional logic"],
  
  // Security
  "cybersecurity": ["cybersecurity", "security", "an ninh mạng", "bảo mật"],
  "network security": ["network security", "firewall", "an ninh mạng"],
  "information security": ["information security", "an toàn thông tin"],
  
  // Project Management & Soft Skills
  "agile": ["agile", "scrum", "kanban", "sprint"],
  "project management": ["project management", "quản lý dự án", "pm"],
  "communication": ["communication", "giao tiếp", "teamwork", "làm việc nhóm"],
  "problem solving": ["problem solving", "giải quyết vấn đề", "analytical thinking"],
  "leadership": ["leadership", "lãnh đạo", "team lead"],
  "presentation": ["presentation", "thuyết trình", "public speaking"],
  
  // Other Technologies
  "api": ["api", "rest", "restful", "graphql", "api development"],
  "microservices": ["microservices", "vi dịch vụ"],
  "blockchain": ["blockchain", "chuỗi khối", "cryptocurrency"],
  "iot": ["iot", "internet of things", "vạn vật kết nối"],
  "game development": ["game development", "unity", "unreal", "phát triển game"],
  "ui/ux": ["ui/ux", "user experience", "thiết kế giao diện", "figma"],
  "embedded systems": ["embedded", "nhúng", "embedded systems", "hệ thống nhúng"],
  "multimedia": ["multimedia", "đa phương tiện", "graphics"],
  "distributed systems": ["distributed systems", "hệ phân tán"]
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
            content: `You are a skill extraction assistant specialized in IT and Computer Science curriculum analysis. Extract technical skills, academic subjects, soft skills, and competencies from academic transcripts, CVs, or resumes. 

Focus on:
- Programming languages (C/C++, Java, Python, JavaScript, etc.)
- Web technologies (HTML/CSS, React, Angular, Vue, Node.js)
- Mobile development (Android, iOS, Flutter)
- Database systems (SQL, NoSQL, MongoDB)
- AI/ML topics (Machine Learning, Deep Learning, NLP, Computer Vision)
- Computer Science fundamentals (Data Structures, Algorithms, Operating Systems, Computer Networks, Computer Architecture)
- Mathematics (Discrete Math, Linear Algebra, Calculus, Statistics)
- Software Engineering (OOP, Design Patterns, Testing, Software Architecture)
- DevOps & Cloud (Git, Docker, Kubernetes, AWS, Azure)
- Security (Cybersecurity, Network Security)
- Soft skills (Communication, Teamwork, Problem Solving, Leadership)
- Academic subjects in both English and Vietnamese (e.g., "Cấu trúc dữ liệu", "Lập trình hướng đối tượng")

Return ONLY a JSON array of skill/subject names. Be generous in extraction - include course names, technologies, methodologies, and competencies.
Example: ["python", "data structures", "cấu trúc dữ liệu", "react", "machine learning", "communication", "git"]`
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
