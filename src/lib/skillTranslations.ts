// Skill name normalization and translation
// Maps Vietnamese skill names to English equivalents
export const skillTranslations: Record<string, string> = {
  // Programming Fundamentals
  'nhập môn lập trình': 'introduction to programming',
  'nhập môn lập trình c++': 'introduction to c++ programming',
  'nhập môn lập trình python': 'introduction to python programming',
  'nhập môn lập trình java': 'introduction to java programming',
  'khái niệm lập trình': 'programming concepts',
  'tư duy lập trình': 'programming thinking',
  'tư duy thuật toán': 'algorithmic thinking',
  'tư duy logic': 'logical thinking',
  'tư duy tính toán': 'computational thinking',
  'cơ bản lập trình': 'basic programming',
  'nền tảng lập trình': 'programming fundamentals',
  
  // Programming Languages
  'lập trình': 'programming',
  'ngôn ngữ lập trình': 'programming language',
  'javascript': 'javascript',
  'java': 'java',
  'python': 'python',
  'typescript': 'typescript',
  'c++': 'c++',
  'c#': 'c#',
  'php': 'php',
  'ruby': 'ruby',
  'go': 'go',
  'golang': 'golang',
  'rust': 'rust',
  'swift': 'swift',
  'kotlin': 'kotlin',
  
  // Web Technologies
  'html': 'html',
  'css': 'css',
  'react': 'react',
  'reactjs': 'react',
  'angular': 'angular',
  'vue': 'vue.js',
  'vue.js': 'vue.js',
  'vuejs': 'vue.js',
  'node': 'node.js',
  'node.js': 'node.js',
  'nodejs': 'node.js',
  'express': 'express',
  'expressjs': 'express.js',
  'next': 'next.js',
  'next.js': 'next.js',
  'nextjs': 'next.js',
  'nuxt': 'nuxt.js',
  'nuxt.js': 'nuxt.js',
  
  // Frameworks
  'django': 'django',
  'flask': 'flask',
  'spring': 'spring boot',
  'spring boot': 'spring boot',
  'laravel': 'laravel',
  'rails': 'ruby on rails',
  'ruby on rails': 'ruby on rails',
  '.net': '.net',
  'dotnet': '.net',
  'asp.net': 'asp.net',
  
  // Databases
  'cơ sở dữ liệu': 'database',
  'sql': 'sql',
  'mysql': 'mysql',
  'postgresql': 'postgresql',
  'postgres': 'postgresql',
  'mongodb': 'mongodb',
  'mongo': 'mongodb',
  'redis': 'redis',
  'oracle': 'oracle',
  'sqlite': 'sqlite',
  'mariadb': 'mariadb',
  'cassandra': 'cassandra',
  'elasticsearch': 'elasticsearch',
  
  // DevOps & Cloud
  'docker': 'docker',
  'kubernetes': 'kubernetes',
  'k8s': 'kubernetes',
  'jenkins': 'jenkins',
  'aws': 'aws',
  'amazon web services': 'aws',
  'azure': 'azure',
  'microsoft azure': 'azure',
  'gcp': 'gcp',
  'google cloud': 'gcp',
  'terraform': 'terraform',
  'ansible': 'ansible',
  'ci/cd': 'ci/cd',
  'cicd': 'ci/cd',
  
  // Tools & Others
  'git': 'git',
  'jira': 'jira',
  'agile': 'agile',
  'scrum': 'scrum',
  'restful': 'rest api',
  'rest api': 'rest api',
  'api': 'api',
  'graphql': 'graphql',
  'websocket': 'websocket',
  'microservices': 'microservices',
  'vi dịch vụ': 'microservices',
  
  // Testing
  'testing': 'testing',
  'kiểm thử': 'testing',
  'unit test': 'unit testing',
  'jest': 'jest',
  'mocha': 'mocha',
  'pytest': 'pytest',
  'selenium': 'selenium',
  
  // Mobile
  'react native': 'react native',
  'flutter': 'flutter',
  'android': 'android',
  'ios': 'ios',
  
  // Data & AI
  'machine learning': 'machine learning',
  'học máy': 'machine learning',
  'ai': 'artificial intelligence',
  'trí tuệ nhân tạo': 'artificial intelligence',
  'deep learning': 'deep learning',
  'học sâu': 'deep learning',
  'data science': 'data science',
  'khoa học dữ liệu': 'data science',
  'data analysis': 'data analysis',
  'phân tích dữ liệu': 'data analysis',
  'big data': 'big data',
  'dữ liệu lớn': 'big data',
  'tensorflow': 'tensorflow',
  'pytorch': 'pytorch',
  'pandas': 'pandas',
  'numpy': 'numpy',
  'scikit-learn': 'scikit-learn',
  
  // Design
  'ui/ux': 'ui/ux',
  'thiết kế ui': 'ui design',
  'thiết kế ux': 'ux design',
  'figma': 'figma',
  'adobe xd': 'adobe xd',
  'photoshop': 'photoshop',
  'illustrator': 'illustrator',
  
  // Soft Skills & Learning
  'giao tiếp': 'communication',
  'làm việc nhóm': 'teamwork',
  'giải quyết vấn đề': 'problem solving',
  'quản lý thời gian': 'time management',
  'lãnh đạo': 'leadership',
  'tư duy phản biện': 'critical thinking',
  'học tập': 'learning',
  'tự học': 'self-learning',
  'nghiên cứu': 'research',
  
  // Course-related terms
  'hệ quản trị cơ sở dữ liệu': 'database management system',
  'cấu trúc dữ liệu': 'data structures',
  'giải thuật': 'algorithms',
  'thuật toán': 'algorithms',
  'lập trình hướng đối tượng': 'object-oriented programming',
  'oop': 'object-oriented programming',
  'lập trình web': 'web programming',
  'phát triển web': 'web development',
  'lập trình di động': 'mobile programming',
  'phát triển ứng dụng': 'application development',
  'kiểm thử phần mềm': 'software testing',
  'bảo mật': 'security',
  'an ninh mạng': 'cybersecurity',
  'mạng máy tính': 'computer networks',
  'hệ điều hành': 'operating systems',
  'hệ thống máy tính': 'computer systems',
  'kiến trúc máy tính': 'computer architecture',
  'kỹ thuật phần mềm': 'software engineering',
  'quản lý dự án': 'project management',
};

/**
 * Normalize and translate skill name to English
 * Handles Vietnamese names, special characters, and variations
 */
export function normalizeSkillName(skill: string): string {
  if (!skill) return '';
  
  // Convert to lowercase and trim
  let normalized = skill.toLowerCase().trim();
  
  // Remove extra whitespace
  normalized = normalized.replace(/\s+/g, ' ');
  
  // Check direct translation BEFORE removing Vietnamese characters
  if (skillTranslations[normalized]) {
    return skillTranslations[normalized];
  }
  
  // Try partial matches (for compound skills)
  for (const [vietnamese, english] of Object.entries(skillTranslations)) {
    if (normalized.includes(vietnamese) || vietnamese.includes(normalized)) {
      return english;
    }
  }
  
  // If no translation found, clean up special characters (but keep Vietnamese chars for display)
  // Remove only non-alphanumeric except dots, hyphens, and Vietnamese characters
  normalized = normalized.replace(/[^\w\s.\-+#/àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/gi, '');
  
  // Return cleaned skill name
  return normalized;
}

/**
 * Get display name for skill based on language
 * Used in PDF and frontend to show appropriate language
 */
export function getSkillDisplayName(skill: string, language: 'vi' | 'en'): string {
  const normalized = normalizeSkillName(skill);
  
  if (language === 'en') {
    return normalized;
  }
  
  // Return original for Vietnamese (keep Vietnamese names in Vietnamese report)
  return skill;
}
