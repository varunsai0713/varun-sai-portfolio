const fs = require('fs');
const path = require('path');

const publicDir = path.resolve(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Minimal valid single-page PDF containing text for Varun Sai's Resume
const lines = [
  "VARUN SAI - SOFTWARE ENGINEER",
  "Email: varunsaiv0713@gmail.com | Location: India",
  "LinkedIn: https://www.linkedin.com/in/varun-sai-6379aa242/",
  "",
  "SUMMARY",
  "Software Engineer with hands-on experience developing REST APIs and web applications",
  "using Java, Spring Boot, React.js, and SQL. Experienced in backend development,",
  "database operations, API security, and Agile workflows.",
  "",
  "TECHNICAL SKILLS",
  "Languages: Java, Python, JavaScript",
  "Frontend: React.js, HTML5, CSS3, Figma, Tailwind CSS",
  "Backend: Spring Boot, Spring Security, Hibernate, REST APIs",
  "Databases: MySQL, PostgreSQL",
  "Cloud & DevOps: Google Cloud (GCP), Git, GitHub, Jenkins, Docker, Kubernetes",
  "Testing & Monitoring: Postman, JUnit, Prometheus",
  "",
  "EXPERIENCE",
  "Oppty Techhub Private Limited - Associate Software Engineer (Oct 2025 - Sep 2026)",
  "- Architected full-stack HRMS using React.js, Spring Boot, and MySQL.",
  "- Designed and delivered 10+ production REST APIs with Spring Boot and Hibernate.",
  "- Secured application using Spring Security with JWT-based authentication and RBAC.",
  "",
  "Allied Market Research - Data Analysis Intern (May 2024 - July 2024)",
  "- Performed exploratory data analysis using Python and SQL to identify market trends.",
  "- Visualized market patterns using Matplotlib for clear reporting.",
  "",
  "EDUCATION",
  "- Gitam Institute of Technology: B.Tech in Electronics & Communication Engineering (2021-2025)",
  "- Vignan Junior College: Higher Secondary (12th) (2019-2021)"
];

// Build stream content
let streamText = "BT\n/F1 10 Tf\n40 760 Td\n14 TL\n";
for (const line of lines) {
  if (line.startsWith("VARUN SAI")) {
    streamText += `/F2 16 Tf (${line.replace(/[()]/g, '')}) Tj\n/F1 10 Tf\nT*\n`;
  } else if (["SUMMARY", "TECHNICAL SKILLS", "EXPERIENCE", "EDUCATION"].includes(line)) {
    streamText += `T*\n/F2 12 Tf (${line}) Tj\n/F1 10 Tf\nT*\n`;
  } else if (line === "") {
    streamText += "T*\n";
  } else {
    // Escape parens
    const safe = line.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
    streamText += `(${safe}) Tj\nT*\n`;
  }
}
streamText += "ET\n";

const streamLen = Buffer.byteLength(streamText, 'utf8');

const objects = [
  // 1: Catalog
  `1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`,
  // 2: Pages
  `2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n`,
  // 3: Page
  `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>\nendobj\n`,
  // 4: Content stream
  `4 0 obj\n<< /Length ${streamLen} >>\nstream\n${streamText}endstream\nendobj\n`,
  // 5: Font F1 (Helvetica)
  `5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n`,
  // 6: Font F2 (Helvetica-Bold)
  `6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n`
];

let pdfData = "%PDF-1.4\n";
const xref = [0];

for (const obj of objects) {
  xref.push(Buffer.byteLength(pdfData, 'utf8'));
  pdfData += obj;
}

const startxref = Buffer.byteLength(pdfData, 'utf8');
pdfData += `xref\n0 ${xref.length}\n0000000000 65535 f \n`;
for (let i = 1; i < xref.length; i++) {
  pdfData += String(xref[i]).padStart(10, '0') + " 00000 n \n";
}
pdfData += `trailer\n<< /Size ${xref.length} /Root 1 0 R >>\nstartxref\n${startxref}\n%%EOF\n`;

fs.writeFileSync(path.resolve(publicDir, 'resume.pdf'), Buffer.from(pdfData, 'utf8'));
console.log('Successfully generated public/resume.pdf');
