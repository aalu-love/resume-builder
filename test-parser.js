import extractInformation from "./src/helper/ResumeBuilderHelper.js";

const testResume = `John Doe
Software Developer | Full Stack Engineer

Contact
Address: 123 Main St, Anytown, CA
Phone: (555) 123-4567
Email: john.doe@email.com
LinkedIn: linkedin.com/in/johndoe
Github: github.com/johndoe

Summary
Experienced software developer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies.

Skills
- Programming: JavaScript, Python, Java
- Frameworks: React, Node.js, Express
- Databases: MongoDB, PostgreSQL
- Tools: Git, Docker, AWS

Education
Bachelor of Computer Science (BCS): Computer Science
University of Technology - San Francisco, CA - May 2020

Experience / Internships
Employee: Senior Software Engineer
Employer: Tech Corp - San Francisco, CA
Duration: June 2021 - Present
- Led development of microservices architecture
- Improved application performance by 40%
- Mentored junior developers

Projects
- E-commerce Platform: Built with React and Node.js
- Data Analytics Dashboard: Python and D3.js visualization

Certifications
- AWS Certified Solutions Architect
- Google Cloud Professional Developer

Languages
- English: Native
- Spanish: Intermediate
`;

try {
  const result = extractInformation(testResume);
  console.log("✅ Parser works! Extracted data:");
  console.log("Name:", result.name);
  console.log("Title:", result.title);
  console.log("Skills:", result.skills.length, "items");
  console.log("Education:", result.education.length, "entries");
  console.log("Experience:", result.experience.length, "entries");
  console.log("Sample skills:", result.skills.slice(0, 3));
} catch (error) {
  console.log("❌ Parser error:", error.message);
}
