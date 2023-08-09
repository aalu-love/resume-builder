# [Resume Builder Project](https://resume-builder-umber.vercel.app)

The **Resume Builder** is a web application that allows users to easily generate their own resumes by filling out a text template with their personal information, skills, education, work experience, and more.

## Features

- User-friendly interface for entering resume content.
- Sections for personal information, skills, education, work experience, projects, certifications, languages, and more.
- Custom alert message when generating the resume without filling in the required fields.
- Option to download the generated resume as a PDF or print it.

## Technologies Used

- **Front-end:** React.js
- **Styling:** CSS
- **State Management:** React state
- **PDF Generation:** Using the default browser print feature
- **Alert Management:** React state and setTimeout

## How It Works

1. Users can enter their resume content in the provided text template.
2. Use the given template to genrate a prompt in ChatGPT that 'resume builder with given template'
3. After genrated response form ChatGPT paste it in the input field.
4. The application validates if the required fields are filled in before generating the resume.
5. If the user tries to generate the resume without filling in the required fields, a custom alert message is displayed for 2 seconds.
6. When the user successfully enters all the required information and clicks the "Generate Resume" button, the resume is generated based on the entered content.
7. Users can then download the generated resume as a PDF or print it (margin: { top: 0.19', buttom: 0.19' }, scale: 95, header/footer: off).

## Why It's Useful

- **Saves Time:** Users can quickly create a well-structured resume without the need for formatting.
- **Customization:** Users can customize their resumes based on their individual skills and experiences.
- **Convenience:** The application provides a simple and intuitive interface for generating resumes.

## Future Enhancements

- Add more templates and styling options for the resume.
- Allow users to save and load their resume data.
- Provide more formatting options for the generated PDF.

## Try It Out

To try out the Resume Builder project, you can clone the GitHub repository and run it locally on your machine.

Repository: [Resume Builder GitHub Repository](https://github.com/aalu-love/resume-builder)

## Author

- SANJU BODRA
- Contact: [sanjubodra1420@gmail.com](mailto:sanjubodra1420@gmail.com)
- GitHub: [https://github.com/aalu-love](https://github.com/aalu-love)

---

Feel free to customize this Markdown file to include more details about your project, such as installation instructions, screenshots, and additional features.

## Template
```
[Your Name]
[Your Job Title] | [Your Skills/Expertise]

Contact
Address: [Your Address]
Phone: [Your Phone Number]
Email: [Your Email]
LinkedIn: [Your LinkedIn Profile]
Portfolio: [Your Portfolio Website]
Github: [Your GitHub Profile]

Summary
[Summary About Yourself]

Skills
- Programming: [Programming Languages]
- Databases: [Databases]
- Frameworks/Libraries: [Frameworks and Libraries]
- Build Tools: [Build Tools]
- Tools/Technologies: [Tools and Technologies]
- Web Development: [Web Development Technologies]
- Data Analysis: [Data Analysis Skills]
- Version Control: [Version Control Tools]
- Operating Systems: [Operating Systems]

Education
Master of Computer Applications (MCA): Information Technology
[University Name] - [Location]
(Expected Graduation: [Expected Graduation Date])

Bachelor of Computer Applications (BCA): Information Technology
[University Name] - [Location]
[Graduation Date]

Experience / Internships
[Job Title/Position] - [Company Name] - [Location]
[Start Date] - [End Date]
- [Responsibilities and Achievements]

Projects
- [Project Name]
- [Project Name]
- [Project Name]
- ...

Certifications
- [Certification Name]
- [Certification Name]
- ...

Languages
- English (Fluent)
- Hindi (Native)

```
