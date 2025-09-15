import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const exportToPDF = async (elementId, filename = 'portfolio.pdf', options = {}) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with id "${elementId}" not found`);
    }

    // Default options
    const defaultOptions = {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      ...options
    };

    // Create canvas from HTML element
    const canvas = await html2canvas(element, defaultOptions);
    const imgData = canvas.toDataURL('image/png');

    // Calculate dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save the PDF
    pdf.save(filename);
    return { success: true, message: 'PDF exported successfully' };
  } catch (error) {
    console.error('PDF export error:', error);
    return { success: false, error: error.message };
  }
};

export const exportPortfolioToPDF = async (portfolioData) => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;
    let yPosition = margin;

    // Helper function to add text with word wrapping
    const addText = (text, fontSize = 12, isBold = false) => {
      pdf.setFontSize(fontSize);
      pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
      
      const lines = pdf.splitTextToSize(text, contentWidth);
      lines.forEach(line => {
        if (yPosition > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(line, margin, yPosition);
        yPosition += fontSize * 0.5;
      });
      yPosition += 5; // Add spacing after text block
    };

    // Header
    pdf.setFillColor(236, 72, 153); // Primary color
    pdf.rect(0, 0, pageWidth, 40, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text(portfolioData.name || 'Professional Portfolio', margin, 25);
    
    pdf.setFontSize(14);
    pdf.text(portfolioData.title || 'Career Professional', margin, 35);
    
    yPosition = 50;
    pdf.setTextColor(0, 0, 0);

    // Contact Information
    if (portfolioData.email || portfolioData.phone || portfolioData.location) {
      addText('Contact Information', 16, true);
      if (portfolioData.email) addText(`Email: ${portfolioData.email}`);
      if (portfolioData.phone) addText(`Phone: ${portfolioData.phone}`);
      if (portfolioData.location) addText(`Location: ${portfolioData.location}`);
      yPosition += 10;
    }

    // Professional Summary
    if (portfolioData.summary) {
      addText('Professional Summary', 16, true);
      addText(portfolioData.summary);
      yPosition += 10;
    }

    // Skills
    if (portfolioData.skills && portfolioData.skills.length > 0) {
      addText('Skills', 16, true);
      const skillsText = portfolioData.skills.map(skill => 
        `• ${skill.name} (${skill.level})`
      ).join('\n');
      addText(skillsText);
      yPosition += 10;
    }

    // Experience
    if (portfolioData.experience && portfolioData.experience.length > 0) {
      addText('Professional Experience', 16, true);
      portfolioData.experience.forEach(exp => {
        addText(`${exp.title} at ${exp.company}`, 14, true);
        addText(`${exp.startDate} - ${exp.endDate || 'Present'}`);
        if (exp.description) addText(exp.description);
        yPosition += 5;
      });
      yPosition += 10;
    }

    // Education
    if (portfolioData.education && portfolioData.education.length > 0) {
      addText('Education', 16, true);
      portfolioData.education.forEach(edu => {
        addText(`${edu.degree} in ${edu.field}`, 14, true);
        addText(`${edu.school} (${edu.year})`);
        if (edu.gpa) addText(`GPA: ${edu.gpa}`);
        yPosition += 5;
      });
      yPosition += 10;
    }

    // Projects
    if (portfolioData.projects && portfolioData.projects.length > 0) {
      addText('Projects', 16, true);
      portfolioData.projects.forEach(project => {
        addText(project.name, 14, true);
        if (project.description) addText(project.description);
        if (project.technologies) addText(`Technologies: ${project.technologies.join(', ')}`);
        if (project.url) addText(`URL: ${project.url}`);
        yPosition += 5;
      });
    }

    // Footer
    const timestamp = new Date().toLocaleDateString();
    pdf.setFontSize(10);
    pdf.setTextColor(128, 128, 128);
    pdf.text(`Generated by CareerCraft on ${timestamp}`, margin, pageHeight - 10);

    // Save the PDF
    const filename = `${portfolioData.name?.replace(/\s+/g, '_') || 'portfolio'}_${Date.now()}.pdf`;
    pdf.save(filename);
    
    return { success: true, message: 'Portfolio PDF exported successfully', filename };
  } catch (error) {
    console.error('Portfolio PDF export error:', error);
    return { success: false, error: error.message };
  }
};
