const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Comprehensive skill mapping for Vietnamese IT transcript subjects
const SKILL_MAPPING: Record<string, string[]> = {
  // Programming Languages & Courses
  "c/c++": ["c++", "c", "cpp", "c programming", "c language", "lập trình c", "lập trình c++", "ngôn ngữ c"],
  "java": ["java", "java core", "j2ee", "spring", "spring boot", "hibernate", "lập trình java", "java programming"],
  "python": ["python", "py", "pandas", "numpy", "lập trình python", "python programming"],
  "javascript": ["javascript", "js", "es6", "typescript", "node.js", "nodejs", "express", "lập trình javascript"],
  "oop": ["oop", "object oriented", "lập trình hướng đối tượng", "hướng đối tượng", "object-oriented programming"],
  
  // Web & Mobile Development
  "web development": ["web", "phát triển web", "lập trình web", "ứng dụng web", "web application"],
  "html/css": ["html", "css", "html5", "css3", "thiết kế web"],
  "react": ["react", "reactjs", "react.js", "react native"],
  "angular": ["angular", "angularjs"],
  "vue": ["vue", "vuejs", "vue.js"],
  "mobile development": ["mobile", "di động", "ứng dụng di động", "lập trình di động"],
  "android": ["android", "android studio", "lập trình android"],
  "ios": ["ios", "ios development", "lập trình ios"],
  
  // Database & Data
  "database": ["database", "cơ sở dữ liệu", "csdl", "hệ quản trị cơ sở dữ liệu", "dbms"],
  "sql": ["sql", "mysql", "postgresql", "sql server", "oracle", "structured query language"],
  "nosql": ["nosql", "mongodb", "mongo", "cassandra", "redis"],
  "data structures": ["data structures", "cấu trúc dữ liệu", "ctdl", "dữ liệu"],
  "algorithms": ["algorithms", "algorithm", "thuật toán", "giải thuật", "cấu trúc dữ liệu và giải thuật"],
  
  // AI & Machine Learning
  "artificial intelligence": ["ai", "artificial intelligence", "trí tuệ nhân tạo", "ttnt"],
  "machine learning": ["machine learning", "ml", "học máy"],
  "deep learning": ["deep learning", "học sâu", "neural network", "mạng nơ-ron"],
  "nlp": ["nlp", "natural language processing", "xử lý ngôn ngữ tự nhiên"],
  "computer vision": ["computer vision", "thị giác máy tính", "image processing", "xử lý ảnh"],
  
  // Systems & Architecture
  "operating systems": ["operating systems", "os", "hệ điều hành", "hdh", "linux", "unix"],
  "computer architecture": ["computer architecture", "kiến trúc máy tính", "ktmt", "organization"],
  "computer networks": ["computer networks", "networking", "network", "mạng máy tính", "mmt"],
  "distributed systems": ["distributed systems", "hệ phân tán", "hệ thống phân tán"],
  "embedded systems": ["embedded", "nhúng", "embedded systems", "hệ thống nhúng", "hệ nhúng"],
  
  // Software Engineering
  "software engineering": ["software engineering", "công nghệ phần mềm", "cnpm", "phần mềm"],
  "requirements analysis": ["requirements", "phân tích yêu cầu", "yêu cầu phần mềm", "requirements engineering"],
  "software design": ["software design", "thiết kế phần mềm", "phân tích thiết kế", "system design"],
  "testing": ["testing", "qa", "qc", "kiểm thử", "kiểm thử phần mềm", "software testing"],
  "software architecture": ["software architecture", "kiến trúc phần mềm"],
  "design patterns": ["design patterns", "mvc", "mvvm", "mẫu thiết kế"],
  
  // Security
  "information security": ["information security", "an toàn thông tin", "attt", "security"],
  "network security": ["network security", "an ninh mạng", "firewall"],
  "cybersecurity": ["cybersecurity", "cyber security", "bảo mật"],
  
  // Mathematics
  "discrete math": ["discrete math", "discrete mathematics", "toán rời rạc", "trr", "logic", "graph theory"],
  "linear algebra": ["linear algebra", "đại số tuyến tính", "dstt", "matrix", "vector"],
  "calculus": ["calculus", "giải tích", "gt", "mathematics", "toán cao cấp"],
  "statistics": ["statistics", "probability", "xác suất thống kê", "xstk", "thống kê"],
  "logic": ["logic", "toán logic", "mathematical logic", "propositional logic"],
  
  // Graphics & Multimedia
  "computer graphics": ["computer graphics", "đồ họa máy tính", "đồ họa", "graphics", "opengl"],
  "multimedia": ["multimedia", "đa phương tiện", "dpt"],
  "game development": ["game", "game development", "phát triển game", "unity", "unreal"],
  
  // Other Technologies
  "iot": ["iot", "internet of things", "vạn vật kết nối", "iot systems"],
  "blockchain": ["blockchain", "chuỗi khối", "cryptocurrency", "smart contracts"],
  "cloud computing": ["cloud", "cloud computing", "điện toán đám mây", "aws", "azure"],
  "devops": ["devops", "ci/cd", "docker", "kubernetes"],
  "git": ["git", "github", "gitlab", "version control", "quản lý phiên bản"],
  
  // UI/UX
  "ui/ux": ["ui", "ux", "ui/ux", "user experience", "user interface", "thiết kế giao diện", "giao diện người dùng", "human-computer interaction", "hci"],
  
  // Soft Skills
  "communication": ["communication", "giao tiếp", "teamwork", "làm việc nhóm"],
  "problem solving": ["problem solving", "giải quyết vấn đề", "critical thinking"],
  "project management": ["project management", "quản lý dự án", "agile", "scrum"]
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
            content: `You are a skill extraction assistant for analyzing Vietnamese IT student transcripts. Extract all course names, subjects, technologies, and skills mentioned in the transcript.

Look for these common transcript subjects:
- Programming courses: "Lập trình C/C++", "Lập trình Java", "Lập trình Python", "Lập trình hướng đối tượng"
- Data & Algorithms: "Cấu trúc dữ liệu và giải thuật", "Toán rời rạc", "Thuật toán"
- Systems: "Hệ điều hành", "Kiến trúc máy tính", "Hệ thống nhúng", "Hệ phân tán"
- Networks: "Mạng máy tính", "An ninh mạng", "An toàn thông tin"
- Databases: "Cơ sở dữ liệu", "Hệ quản trị CSDL", "SQL", "NoSQL"
- Software Engineering: "Công nghệ phần mềm", "Phân tích thiết kế hệ thống", "Kiểm thử phần mềm"
- AI/ML: "Trí tuệ nhân tạo", "Học máy", "Xử lý ngôn ngữ tự nhiên", "Thị giác máy tính"
- Web/Mobile: "Phát triển ứng dụng web", "Lập trình Android/iOS", "Thiết kế giao diện"
- Mathematics: "Giải tích", "Đại số tuyến tính", "Xác suất thống kê", "Toán logic"
- Other: "Đa phương tiện", "Đồ họa máy tính", "Blockchain", "IoT"

Extract both Vietnamese course names and their English equivalents. Also extract any technologies, tools, frameworks, or skills mentioned.

CRITICAL: Return ONLY a pure JSON array, no markdown formatting, no code blocks, no additional text.
Example output format: ["lập trình c++", "c++", "cấu trúc dữ liệu", "data structures", "hệ điều hành", "operating systems", "react", "sql"]`
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
      let content = aiData.choices[0]?.message?.content || '[]';
      
      // Strip markdown code blocks if present
      content = content.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
      
      extractedSkills = JSON.parse(content);
      console.log('Extracted skills:', extractedSkills);
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
