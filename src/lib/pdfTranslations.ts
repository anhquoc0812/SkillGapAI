export interface PDFTranslations {
  title: string;
  subtitle: string;
  generatedOn: string;
  analyzedFile: string;
  overview: string;
  matchScore: string;
  marketReadiness: string;
  skillsToLearn: string;
  chartSection: string;
  chartDescription: string;
  currentSkills: string;
  identifiedSkills: string;
  learningRoadmap: string;
  phase1: string;
  phase1Description: string;
  phase2: string;
  phase2Description: string;
  phase3: string;
  phase3Description: string;
  requiredIn: string;
  jobs: string;
  priorityCritical: string;
  priorityImportant: string;
  priorityNiceToHave: string;
  courseSuggestions: string;
  courseTableHeaders: {
    no: string;
    skill: string;
    course: string;
    type: string;
    platform: string;
  };
  courseTypeFree: string;
  courseTypePaid: string;
  noCoursesAvailable: string;
}

export const translations: Record<'vi' | 'en', PDFTranslations> = {
  vi: {
    title: 'BÁO CÁO PHÂN TÍCH KHOẢNG CÁCH KỸ NĂNG',
    subtitle: 'Phân tích so sánh kỹ năng của bạn với nhu cầu thị trường',
    generatedOn: 'Ngày tạo:',
    analyzedFile: 'File phân tích:',
    overview: 'TỔNG QUAN',
    matchScore: 'Độ khớp với thị trường',
    marketReadiness: 'Sẵn sàng thị trường',
    skillsToLearn: 'Kỹ năng cần học',
    chartSection: 'BIỂU ĐỒ NHU CẦU THỊ TRƯỜNG',
    chartDescription: 'So sánh kỹ năng của bạn (màu xanh) với nhu cầu thị trường từ 1,491 tin tuyển dụng',
    currentSkills: 'KỸ NĂNG HIỆN TẠI',
    identifiedSkills: 'kỹ năng được xác định',
    learningRoadmap: 'LỘ TRÌNH HỌC TẬP ƯU TIÊN',
    phase1: 'Giai đoạn 1: Kỹ năng quan trọng nhất',
    phase1Description: 'Những kỹ năng này xuất hiện nhiều nhất trong các tin tuyển dụng và nên được ưu tiên học trước.',
    phase2: 'Giai đoạn 2: Kỹ năng quan trọng',
    phase2Description: 'Những kỹ năng bổ sung giúp tăng khả năng cạnh tranh trên thị trường lao động.',
    phase3: 'Giai đoạn 3: Kỹ năng bổ sung',
    phase3Description: 'Những kỹ năng này sẽ giúp hoàn thiện hồ sơ và mở rộng cơ hội nghề nghiệp.',
    requiredIn: 'Yêu cầu trong',
    jobs: 'công việc',
    priorityCritical: 'QUAN TRỌNG NHẤT',
    priorityImportant: 'QUAN TRỌNG',
    priorityNiceToHave: 'BỔ SUNG',
    courseSuggestions: 'GỢI Ý KHÓA HỌC',
    courseTableHeaders: {
      no: 'STT',
      skill: 'Kỹ năng',
      course: 'Khóa học',
      type: 'Loại',
      platform: 'Nền tảng',
    },
    courseTypeFree: 'Miễn phí',
    courseTypePaid: 'Trả phí',
    noCoursesAvailable: 'Đang cập nhật khóa học cho kỹ năng này',
  },
  en: {
    title: 'SKILL GAP ANALYSIS REPORT',
    subtitle: 'Comparing your skills with market demand',
    generatedOn: 'Generated on:',
    analyzedFile: 'Analyzed file:',
    overview: 'OVERVIEW',
    matchScore: 'Market Match Score',
    marketReadiness: 'Market Readiness',
    skillsToLearn: 'Skills to Learn',
    chartSection: 'MARKET DEMAND CHART',
    chartDescription: 'Comparison of your skills (green) with market demand from 1,491 job listings',
    currentSkills: 'CURRENT SKILLS',
    identifiedSkills: 'identified skills',
    learningRoadmap: 'PRIORITY LEARNING ROADMAP',
    phase1: 'Phase 1: Critical Skills',
    phase1Description: 'These skills appear most frequently in job listings and should be your top priority.',
    phase2: 'Phase 2: Important Skills',
    phase2Description: 'Additional skills that will increase your competitiveness in the job market.',
    phase3: 'Phase 3: Nice-to-Have Skills',
    phase3Description: 'These skills will help round out your profile and expand career opportunities.',
    requiredIn: 'Required in',
    jobs: 'jobs',
    priorityCritical: 'CRITICAL',
    priorityImportant: 'IMPORTANT',
    priorityNiceToHave: 'NICE-TO-HAVE',
    courseSuggestions: 'COURSE SUGGESTIONS',
    courseTableHeaders: {
      no: 'No.',
      skill: 'Skill',
      course: 'Course',
      type: 'Type',
      platform: 'Platform',
    },
    courseTypeFree: 'Free',
    courseTypePaid: 'Paid',
    noCoursesAvailable: 'Course recommendations coming soon',
  },
};
