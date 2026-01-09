import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { translations } from './pdfTranslations';
import { getCourseLinks } from './learningResources';
import { normalizeSkillName } from './skillTranslations';
import logoImage from '@/assets/logo.png';

interface AnalysisResult {
  id: string;
  file_name: string;
  student_skills: string[];
  market_skills: any[];
  skill_gaps: Array<{
    skill: string;
    count: number;
    percentage: number;
  }>;
  match_percentage: number;
  market_readiness: number;
  created_at: string;
}

/**
 * Generate a professional PDF report with logo, charts, and course recommendations
 * @param analysis - The skill analysis data
 * @param chartElement - DOM element containing the chart to capture
 */
export async function generateSkillGapPDF(
  analysis: AnalysisResult,
  chartElement: HTMLElement | null
): Promise<void> {
  const t = translations['en'];
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  let yPosition = margin;

  // Helper function to add new page if needed
  const checkPageBreak = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  // Helper function to wrap text
  const wrapText = (text: string, maxWidth: number, fontSize: number): string[] => {
    pdf.setFontSize(fontSize);
    return pdf.splitTextToSize(text, maxWidth);
  };

  // Helper to get skill name in English
  const getSkillName = (skill: string): string => {
    return normalizeSkillName(skill);
  };

  try {
    // ===== SECTION 1: HEADER WITH LOGO =====
    // Load and add logo
    const logoImg = new Image();
    logoImg.src = logoImage;
    await new Promise((resolve, reject) => {
      logoImg.onload = resolve;
      logoImg.onerror = reject;
    });
    
    // Add logo (centered, smaller size)
    const logoWidth = 30;
    const logoHeight = 30;
    const logoX = (pageWidth - logoWidth) / 2;
    pdf.addImage(logoImg, 'PNG', logoX, yPosition, logoWidth, logoHeight);
    yPosition += logoHeight + 10;

    // Title
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(30, 58, 138); // Primary blue color
    const titleLines = wrapText(t.title, contentWidth, 24);
    titleLines.forEach(line => {
      pdf.text(line, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 10;
    });

    // Subtitle
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(100, 100, 100);
    pdf.text(t.subtitle, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;

    // Date and file info
    pdf.setFontSize(10);
    pdf.setTextColor(120, 120, 120);
    pdf.text(`${t.generatedOn} ${new Date().toLocaleDateString('en-US')}`, margin, yPosition);
    yPosition += 6;
    pdf.text(`${t.analyzedFile} ${analysis.file_name}`, margin, yPosition);
    yPosition += 15;

    // ===== SECTION 2: OVERVIEW METRICS =====
    checkPageBreak(50);
    
    // Section header
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(30, 58, 138);
    pdf.text(t.overview, margin, yPosition);
    yPosition += 10;

    // Draw metric boxes
    const boxHeight = 30;
    const boxWidth = contentWidth / 3 - 4;
    
    // Match Score Box
    pdf.setFillColor(240, 249, 255);
    pdf.rect(margin, yPosition, boxWidth, boxHeight, 'F');
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text(t.matchScore, margin + boxWidth / 2, yPosition + 10, { align: 'center' });
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(30, 58, 138);
    pdf.text(`${analysis.match_percentage.toFixed(1)}%`, margin + boxWidth / 2, yPosition + 22, { align: 'center' });

    // Market Readiness Box
    pdf.setFillColor(240, 253, 244);
    pdf.rect(margin + boxWidth + 6, yPosition, boxWidth, boxHeight, 'F');
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(100, 100, 100);
    pdf.text(t.marketReadiness, margin + boxWidth + 6 + boxWidth / 2, yPosition + 10, { align: 'center' });
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(22, 163, 74);
    pdf.text(`${analysis.market_readiness.toFixed(1)}%`, margin + boxWidth + 6 + boxWidth / 2, yPosition + 22, { align: 'center' });

    // Skills to Learn Box
    pdf.setFillColor(254, 242, 242);
    pdf.rect(margin + 2 * boxWidth + 12, yPosition, boxWidth, boxHeight, 'F');
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(100, 100, 100);
    pdf.text(t.skillsToLearn, margin + 2 * boxWidth + 12 + boxWidth / 2, yPosition + 10, { align: 'center' });
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(220, 38, 38);
    pdf.text(`${analysis.skill_gaps.length}`, margin + 2 * boxWidth + 12 + boxWidth / 2, yPosition + 22, { align: 'center' });

    yPosition += boxHeight + 15;

    // ===== SECTION 3: CHART =====
    checkPageBreak(100);
    
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(30, 58, 138);
    pdf.text(t.chartSection, margin, yPosition);
    yPosition += 8;

    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(120, 120, 120);
    const chartDescLines = wrapText(t.chartDescription, contentWidth, 9);
    chartDescLines.forEach(line => {
      pdf.text(line, margin, yPosition);
      yPosition += 5;
    });
    yPosition += 5;

    // Capture chart with high quality
    if (chartElement) {
      try {
        const canvas = await html2canvas(chartElement, {
          scale: 3, // High resolution for clarity
          backgroundColor: '#ffffff',
          logging: false,
        });

        const chartImgData = canvas.toDataURL('image/png');
        const chartWidth = contentWidth;
        const chartHeight = (canvas.height * chartWidth) / canvas.width;

        // Check if we need a new page for the chart
        if (checkPageBreak(chartHeight + 10)) {
          // Chart starts on new page
        }

        pdf.addImage(chartImgData, 'PNG', margin, yPosition, chartWidth, chartHeight);
        yPosition += chartHeight + 15;
      } catch (error) {
        console.error('Error capturing chart:', error);
        pdf.setFontSize(10);
        pdf.setTextColor(200, 50, 50);
        pdf.text('Chart could not be rendered', margin, yPosition);
        yPosition += 10;
      }
    }

    // ===== SECTION 4: CURRENT SKILLS =====
    checkPageBreak(30);
    
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(30, 58, 138);
    pdf.text(t.currentSkills, margin, yPosition);
    yPosition += 8;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(100, 100, 100);
    pdf.text(`${analysis.student_skills.length} ${t.identifiedSkills}`, margin, yPosition);
    yPosition += 10;

    // Display skills in a grid (3 columns)
    const skillsPerRow = 3;
    const skillColumnWidth = contentWidth / skillsPerRow;
    
    pdf.setFontSize(9);
    pdf.setTextColor(50, 50, 50);
    
    analysis.student_skills.forEach((skill, index) => {
      const column = index % skillsPerRow;
      const skillX = margin + column * skillColumnWidth;
      
      if (column === 0 && index > 0) {
        yPosition += 6;
        checkPageBreak(10);
      }
      
      // Bullet point
      pdf.setFillColor(34, 197, 94);
      pdf.circle(skillX + 1, yPosition - 1, 1, 'F');
      
      // Skill name (translated to English and capitalized)
      const translatedSkill = getSkillName(skill);
      const skillText = translatedSkill.charAt(0).toUpperCase() + translatedSkill.slice(1);
      pdf.text(skillText, skillX + 4, yPosition);
    });

    yPosition += 15;

    // ===== SECTION 5: LEARNING ROADMAP =====
    checkPageBreak(40);
    
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(30, 58, 138);
    pdf.text(t.learningRoadmap, margin, yPosition);
    yPosition += 10;

    // Split skills into phases
    const criticalSkills = analysis.skill_gaps.slice(0, 3);
    const importantSkills = analysis.skill_gaps.slice(3, 7);
    const niceToHaveSkills = analysis.skill_gaps.slice(7, 10);

    // Phase 1: Critical
    if (criticalSkills.length > 0) {
      checkPageBreak(30);
      
      pdf.setFontSize(13);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(220, 38, 38);
      pdf.text(t.phase1, margin, yPosition);
      yPosition += 7;

      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'italic');
      pdf.setTextColor(100, 100, 100);
      const phase1DescLines = wrapText(t.phase1Description, contentWidth, 9);
      phase1DescLines.forEach(line => {
        pdf.text(line, margin, yPosition);
        yPosition += 5;
      });
      yPosition += 3;

      criticalSkills.forEach((gap, index) => {
        checkPageBreak(15);
        
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(50, 50, 50);
        const skillName = getSkillName(gap.skill);
        const displayName = skillName.charAt(0).toUpperCase() + skillName.slice(1);
        pdf.text(`${index + 1}. ${displayName}`, margin + 5, yPosition);
        yPosition += 6;

        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(120, 120, 120);
        pdf.text(`   ${t.requiredIn} ${gap.percentage}% ${t.jobs} (${gap.count.toLocaleString()})`, margin + 5, yPosition);
        
        // Priority badge
        pdf.setFillColor(220, 38, 38);
        pdf.rect(margin + 5, yPosition + 2, 35, 5, 'F');
        pdf.setFontSize(7);
        pdf.setTextColor(255, 255, 255);
        pdf.text(t.priorityCritical, margin + 7, yPosition + 5.5);
        
        yPosition += 10;
      });

      yPosition += 5;
    }

    // Phase 2: Important
    if (importantSkills.length > 0) {
      checkPageBreak(30);
      
      pdf.setFontSize(13);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(234, 179, 8);
      pdf.text(t.phase2, margin, yPosition);
      yPosition += 7;

      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'italic');
      pdf.setTextColor(100, 100, 100);
      const phase2DescLines = wrapText(t.phase2Description, contentWidth, 9);
      phase2DescLines.forEach(line => {
        pdf.text(line, margin, yPosition);
        yPosition += 5;
      });
      yPosition += 3;

      importantSkills.forEach((gap, index) => {
        checkPageBreak(15);
        
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(50, 50, 50);
        const skillName = getSkillName(gap.skill);
        const displayName = skillName.charAt(0).toUpperCase() + skillName.slice(1);
        pdf.text(`${index + 4}. ${displayName}`, margin + 5, yPosition);
        yPosition += 6;

        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(120, 120, 120);
        pdf.text(`   ${t.requiredIn} ${gap.percentage}% ${t.jobs} (${gap.count.toLocaleString()})`, margin + 5, yPosition);
        
        // Priority badge
        pdf.setFillColor(234, 179, 8);
        pdf.rect(margin + 5, yPosition + 2, 30, 5, 'F');
        pdf.setFontSize(7);
        pdf.setTextColor(255, 255, 255);
        pdf.text(t.priorityImportant, margin + 7, yPosition + 5.5);
        
        yPosition += 10;
      });

      yPosition += 5;
    }

    // Phase 3: Nice-to-Have
    if (niceToHaveSkills.length > 0) {
      checkPageBreak(30);
      
      pdf.setFontSize(13);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(34, 197, 94);
      pdf.text(t.phase3, margin, yPosition);
      yPosition += 7;

      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'italic');
      pdf.setTextColor(100, 100, 100);
      const phase3DescLines = wrapText(t.phase3Description, contentWidth, 9);
      phase3DescLines.forEach(line => {
        pdf.text(line, margin, yPosition);
        yPosition += 5;
      });
      yPosition += 3;

      niceToHaveSkills.forEach((gap, index) => {
        checkPageBreak(15);
        
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(50, 50, 50);
        const skillName = getSkillName(gap.skill);
        const displayName = skillName.charAt(0).toUpperCase() + skillName.slice(1);
        pdf.text(`${index + 8}. ${displayName}`, margin + 5, yPosition);
        yPosition += 6;

        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(120, 120, 120);
        pdf.text(`   ${t.requiredIn} ${gap.percentage}% ${t.jobs} (${gap.count.toLocaleString()})`, margin + 5, yPosition);
        
        // Priority badge
        pdf.setFillColor(34, 197, 94);
        pdf.rect(margin + 5, yPosition + 2, 28, 5, 'F');
        pdf.setFontSize(7);
        pdf.setTextColor(255, 255, 255);
        pdf.text(t.priorityNiceToHave, margin + 7, yPosition + 5.5);
        
        yPosition += 10;
      });

      yPosition += 5;
    }

    // ===== SECTION 6: COURSE SUGGESTIONS =====
    pdf.addPage();
    yPosition = margin;

    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(30, 58, 138);
    pdf.text(t.courseSuggestions, margin, yPosition);
    yPosition += 10;

    // Table headers
    const tableHeaders = t.courseTableHeaders;
    const colWidths = {
      no: 10,
      skill: 35,
      course: 70,
      type: 20,
      platform: 30,
    };

    pdf.setFillColor(30, 58, 138);
    pdf.rect(margin, yPosition, contentWidth, 8, 'F');
    
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(255, 255, 255);
    
    let colX = margin + 2;
    pdf.text(tableHeaders.no, colX, yPosition + 5.5);
    colX += colWidths.no;
    pdf.text(tableHeaders.skill, colX, yPosition + 5.5);
    colX += colWidths.skill;
    pdf.text(tableHeaders.course, colX, yPosition + 5.5);
    colX += colWidths.course;
    pdf.text(tableHeaders.type, colX, yPosition + 5.5);
    colX += colWidths.type;
    pdf.text(tableHeaders.platform, colX, yPosition + 5.5);
    
    yPosition += 10;

    // Course recommendations (top 10 skills)
    const topSkills = analysis.skill_gaps.slice(0, 10);
    let rowNumber = 1;

    for (const gap of topSkills) {
      const normalizedSkill = normalizeSkillName(gap.skill);
      const courses = getCourseLinks(normalizedSkill);
      
      if (courses.length === 0) {
        checkPageBreak(12);
        
        // Draw row background
        pdf.setFillColor(250, 250, 250);
        pdf.rect(margin, yPosition, contentWidth, 10, 'F');
        
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(50, 50, 50);
        
        colX = margin + 2;
        pdf.text(`${rowNumber}`, colX, yPosition + 6.5);
        colX += colWidths.no;
        const displaySkill = getSkillName(gap.skill);
        pdf.text(displaySkill, colX, yPosition + 6.5);
        colX += colWidths.skill;
        
        pdf.setTextColor(150, 150, 150);
        pdf.setFont('helvetica', 'italic');
        pdf.text(t.noCoursesAvailable, colX, yPosition + 6.5);
        
        yPosition += 12;
        rowNumber++;
        continue;
      }

      // Render each course for this skill
      courses.forEach((course, courseIndex) => {
        checkPageBreak(12);
        
        // Alternate row colors
        if (courseIndex % 2 === 0) {
          pdf.setFillColor(250, 250, 250);
          pdf.rect(margin, yPosition, contentWidth, 10, 'F');
        }
        
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(50, 50, 50);
        
        colX = margin + 2;
        
        // Only show row number on first course
        if (courseIndex === 0) {
          pdf.text(`${rowNumber}`, colX, yPosition + 6.5);
        }
        colX += colWidths.no;
        
        // Only show skill name on first course
        if (courseIndex === 0) {
          const skillName = getSkillName(gap.skill);
          const displayName = skillName.charAt(0).toUpperCase() + skillName.slice(1);
          pdf.text(displayName, colX, yPosition + 6.5);
        }
        colX += colWidths.skill;
        
        // Course title (clickable link)
        pdf.setTextColor(37, 99, 235);
        pdf.textWithLink(course.title.substring(0, 40) + (course.title.length > 40 ? '...' : ''), colX, yPosition + 6.5, { url: course.url });
        colX += colWidths.course;
        
        // Type badge
        pdf.setFont('helvetica', 'bold');
        if (course.type === 'free') {
          pdf.setTextColor(22, 163, 74);
          pdf.text(t.courseTypeFree, colX, yPosition + 6.5);
        } else {
          pdf.setTextColor(234, 88, 12);
          pdf.text(t.courseTypePaid, colX, yPosition + 6.5);
        }
        colX += colWidths.type;
        
        // Platform
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(100, 100, 100);
        pdf.text(course.platform, colX, yPosition + 6.5);
        
        yPosition += 10;
      });

      rowNumber++;
      yPosition += 2; // Small gap between skills
    }

    // Save PDF
    const fileName = `skill-gap-report-${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);

  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF report');
  }
}
