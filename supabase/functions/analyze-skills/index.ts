const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Comprehensive skill mapping for Vietnamese IT transcript subjects
const SKILL_MAPPING: Record<string, string[]> = {
  // Programming Languages & Courses
  "c/c++": ["c/c++", "c++", "c", "cpp", "c programming", "c language", "lập trình c", "lập trình c++", "ngôn ngữ c", "nhập môn lập trình c", "nhập môn lập trình c++", "lập trình nâng cao"],
  "java": ["java", "java core", "j2ee", "spring", "spring boot", "hibernate", "lập trình java", "java programming", "nhập môn lập trình java", "lập trình hướng đối tượng java"],
  "python": ["python", "py", "pandas", "numpy", "lập trình python", "python programming", "nhập môn python"],
  "javascript": ["javascript", "js", "es6", "typescript", "node.js", "nodejs", "express", "lập trình javascript"],
  "c#": ["c#", "csharp", "c sharp", "lập trình c#", ".net"],
  "php": ["php", "lập trình php", "php programming"],
  
  // Programming Fundamentals
  "programming": ["lập trình", "programming", "nhập môn lập trình", "cơ bản lập trình", "nền tảng lập trình", "khái niệm lập trình", "introduction to programming"],
  "programming thinking": ["tư duy lập trình", "tư duy thuật toán", "tư duy logic", "tư duy tính toán", "programming thinking", "computational thinking", "algorithmic thinking"],
  "oop": ["oop", "object oriented", "lập trình hướng đối tượng", "hướng đối tượng", "object-oriented programming", "hthđt", "lthdđt"],
  
  // Web & Mobile Development
  "web development": ["web", "phát triển web", "lập trình web", "ứng dụng web", "web application", "thiết kế web động", "công nghệ web", "web programming"],
  "html/css": ["html", "css", "html5", "css3", "thiết kế web", "giao diện web"],
  "react": ["react", "reactjs", "react.js", "react native"],
  "angular": ["angular", "angularjs"],
  "vue": ["vue", "vuejs", "vue.js"],
  "mobile development": ["mobile", "di động", "ứng dụng di động", "lập trình di động", "mobile application"],
  "android": ["android", "android studio", "lập trình android"],
  "ios": ["ios", "ios development", "lập trình ios", "swift"],
  
  // Database & Data
  "database": ["database", "cơ sở dữ liệu", "csdl", "hệ quản trị cơ sở dữ liệu", "dbms", "hqtcsdl", "quản trị cơ sở dữ liệu"],
  "sql": ["sql", "mysql", "postgresql", "sql server", "oracle", "structured query language", "ngôn ngữ sql"],
  "nosql": ["nosql", "mongodb", "mongo", "cassandra", "redis"],
  "data structures": ["data structures", "cấu trúc dữ liệu", "ctdl", "dữ liệu", "data structure"],
  "algorithms": ["algorithms", "algorithm", "thuật toán", "giải thuật", "cấu trúc dữ liệu và giải thuật", "ctdl và gt", "dsa", "ctdlgt"],
  "data mining": ["data mining", "khai phá dữ liệu", "khai thác dữ liệu"],
  "big data": ["big data", "dữ liệu lớn", "hadoop", "spark"],
  
  // AI & Machine Learning
  "artificial intelligence": ["ai", "artificial intelligence", "trí tuệ nhân tạo", "ttnt", "tri tue nhan tao"],
  "machine learning": ["machine learning", "ml", "học máy", "hoc may"],
  "deep learning": ["deep learning", "học sâu", "neural network", "mạng nơ-ron", "mạng neural"],
  "nlp": ["nlp", "natural language processing", "xử lý ngôn ngữ tự nhiên", "xlnntn"],
  "computer vision": ["computer vision", "thị giác máy tính", "image processing", "xử lý ảnh", "tgmt"],
  
  // Systems & Architecture
  "operating systems": ["operating systems", "os", "hệ điều hành", "hdh", "linux", "unix", "windows"],
  "computer systems": ["computer systems", "hệ thống máy tính", "htmt", "kiến trúc hệ thống"],
  "computer architecture": ["computer architecture", "kiến trúc máy tính", "ktmt", "organization", "tổ chức máy tính"],
  "computer networks": ["computer networks", "networking", "network", "mạng máy tính", "mmt", "mang may tinh"],
  "distributed systems": ["distributed systems", "hệ phân tán", "hệ thống phân tán", "hpt"],
  "embedded systems": ["embedded", "nhúng", "embedded systems", "hệ thống nhúng", "hệ nhúng"],
  "microprocessor": ["microprocessor", "vi xử lý", "vxl", "8051", "arm"],
  
  // Software Engineering
  "software engineering": ["software engineering", "công nghệ phần mềm", "cnpm", "phần mềm", "se", "software development"],
  "requirements analysis": ["requirements", "phân tích yêu cầu", "yêu cầu phần mềm", "requirements engineering", "phân tích"],
  "software design": ["software design", "thiết kế phần mềm", "phân tích thiết kế", "system design", "thiết kế hệ thống"],
  "testing": ["testing", "qa", "qc", "kiểm thử", "kiểm thử phần mềm", "software testing", "test"],
  "software architecture": ["software architecture", "kiến trúc phần mềm"],
  "design patterns": ["design patterns", "mvc", "mvvm", "mẫu thiết kế"],
  "agile": ["agile", "scrum", "kanban", "agile development"],
  
  // Security
  "information security": ["information security", "an toàn thông tin", "attt", "security", "bảo mật thông tin"],
  "network security": ["network security", "an ninh mạng", "firewall", "amm"],
  "cybersecurity": ["cybersecurity", "cyber security", "bảo mật", "security"],
  "cryptography": ["cryptography", "mã hóa", "encryption"],
  
  // Mathematics & Theory
  "discrete math": ["discrete math", "discrete mathematics", "toán rời rạc", "trr", "logic", "graph theory", "lý thuyết đồ thị"],
  "linear algebra": ["linear algebra", "đại số tuyến tính", "dstt", "matrix", "vector", "dai so tuyen tinh"],
  "calculus": ["calculus", "giải tích", "gt", "mathematics", "toán cao cấp", "tcc", "giai tich"],
  "statistics": ["statistics", "probability", "xác suất thống kê", "xstk", "thống kê", "xac suat thong ke"],
  "logic": ["logic", "toán logic", "mathematical logic", "propositional logic", "toan logic"],
  "graph theory": ["graph theory", "lý thuyết đồ thị", "đồ thị", "graph"],
  
  // Graphics & Multimedia
  "computer graphics": ["computer graphics", "đồ họa máy tính", "đồ họa", "graphics", "opengl", "dhmt"],
  "multimedia": ["multimedia", "đa phương tiện", "dpt"],
  "game development": ["game", "game development", "phát triển game", "unity", "unreal"],
  "image processing": ["image processing", "xử lý ảnh", "xla"],
  
  // Other Technologies
  "iot": ["iot", "internet of things", "vạn vật kết nối", "iot systems"],
  "blockchain": ["blockchain", "chuỗi khối", "cryptocurrency", "smart contracts"],
  "cloud computing": ["cloud", "cloud computing", "điện toán đám mây", "aws", "azure", "gcp"],
  "devops": ["devops", "ci/cd", "docker", "kubernetes", "jenkins"],
  "git": ["git", "github", "gitlab", "version control", "quản lý phiên bản", "source control"],
  
  // UI/UX
  "ui/ux": ["ui", "ux", "ui/ux", "user experience", "user interface", "thiết kế giao diện", "giao diện người dùng", "human-computer interaction", "hci", "tương tác người máy"],
  
  // Soft Skills & Management
  "communication": ["communication", "giao tiếp", "teamwork", "làm việc nhóm"],
  "problem solving": ["problem solving", "giải quyết vấn đề", "critical thinking", "tư duy phản biện"],
  "project management": ["project management", "quản lý dự án", "agile", "scrum", "qlda"]
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { transcriptText, mainLanguage } = await req.json();
    
    if (!transcriptText || typeof transcriptText !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Invalid transcript text' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Analyzing transcript with AI (main language: ${mainLanguage})...`);
    
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
            content: `You are an expert skill extraction AI for Vietnamese IT student academic transcripts.${mainLanguage ? ` The student's main programming language is ${mainLanguage}, prioritize ${mainLanguage}-related skills.` : ''}

YOUR TASK: Extract ALL technical skills from course names, including both explicit and implicit skills.

EXTRACTION RULES:
1. Extract the EXACT course name as it appears (keep Vietnamese if present)
2. Extract IMPLIED technical skills that the course teaches
3. Extract programming languages mentioned
4. Extract frameworks, tools, and technologies
5. Include both Vietnamese and English variations

COMPREHENSIVE EXAMPLES:

"Nhập môn lập trình C++" → Extract ALL of these:
  ["nhập môn lập trình c++", "c++", "c programming", "lập trình c++", "programming", "lập trình"]

"Cấu trúc dữ liệu và giải thuật" → Extract ALL:
  ["cấu trúc dữ liệu", "data structures", "ctdl", "giải thuật", "thuật toán", "algorithms", "dsa", "problem solving"]

"Lập trình hướng đối tượng" → Extract ALL:
  ["lập trình hướng đối tượng", "oop", "object oriented programming", "hthđt"]

"Hệ điều hành" → Extract ALL:
  ["hệ điều hành", "operating systems", "os", "hdh", "linux", "unix", "system programming"]

"Công nghệ phần mềm" → Extract ALL:
  ["công nghệ phần mềm", "software engineering", "cnpm", "design patterns", "testing", "requirements analysis", "software design"]

"Cơ sở dữ liệu" → Extract ALL:
  ["cơ sở dữ liệu", "database", "csdl", "sql", "dbms", "database design"]

"Mạng máy tính" → Extract ALL:
  ["mạng máy tính", "computer networks", "mmt", "networking", "tcp/ip", "protocols"]

"Phát triển ứng dụng web" → Extract ALL:
  ["phát triển web", "web development", "html", "css", "javascript", "web programming"]

"Trí tuệ nhân tạo" → Extract ALL:
  ["trí tuệ nhân tạo", "artificial intelligence", "ai", "ttnt", "machine learning", "algorithms"]

"Toán rời rạc" → Extract ALL:
  ["toán rời rạc", "discrete math", "trr", "logic", "graph theory", "algorithms"]

"Đồ họa máy tính" → Extract ALL:
  ["đồ họa máy tính", "computer graphics", "graphics", "dhmt", "opengl"]

"An toàn thông tin" → Extract ALL:
  ["an toàn thông tin", "information security", "attt", "security", "cryptography"]

IMPORTANT: 
- Extract EVERY variation (Vietnamese, English, abbreviations)
- Include IMPLIED skills (e.g., "Lập trình Java" implies both "java" and "oop")
- Keep original Vietnamese terms for better matching
- Return ONLY a JSON array, NO markdown, NO code blocks, NO explanations

Format: ["skill1", "skill2", "skill3", ...]`
          },
          {
            role: 'user',
            content: `Extract ALL skills (explicit + implicit) from this Vietnamese transcript:\n\n${transcriptText}`
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
