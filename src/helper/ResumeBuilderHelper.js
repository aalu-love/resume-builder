/**
 * Improved resume parsing with better error handling and validation
 */

const SECTION_HEADERS = {
  CONTACT: "Contact",
  SUMMARY: "Summary",
  SKILLS: "Skills",
  EDUCATION: "Education",
  EXPERIENCE: ["Experience / Internships", "Experiences", "Experience"],
  PROJECTS: ["Projects", "Project"],
  CERTIFICATIONS: ["Certifications", "Certification"],
  LANGUAGES: "Languages",
};

const defaultInfo = {
  name: "",
  title: "",
  contact: {},
  summary: "",
  skills: [],
  education: [],
  experience: [],
  projects: [],
  certifications: [],
  languages: [],
};

function extractInformation(text) {
  if (!text || typeof text !== "string") {
    throw new Error("Invalid input: Please provide valid resume text");
  }

  const lines = text
    .split("\n")
    .map((line) => line?.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    throw new Error("Input is empty. Please fill in the resume details.");
  }

  const info = JSON.parse(JSON.stringify(defaultInfo));
  let section = "";

  try {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check if it's a section header
      if (line === SECTION_HEADERS.CONTACT) {
        section = "contact";
      } else if (line === SECTION_HEADERS.SUMMARY) {
        section = "summary";
      } else if (line === SECTION_HEADERS.SKILLS) {
        section = "skills";
      } else if (line === SECTION_HEADERS.EDUCATION) {
        section = "education";
      } else if (SECTION_HEADERS.EXPERIENCE.includes(line)) {
        section = "experience";
      } else if (SECTION_HEADERS.PROJECTS.some((p) => line === p)) {
        section = "projects";
      } else if (SECTION_HEADERS.CERTIFICATIONS.some((c) => line === c)) {
        section = "certifications";
      } else if (line === SECTION_HEADERS.LANGUAGES) {
        section = "languages";
      } else if (line) {
        // Process content based on current section
        switch (section) {
          case "contact":
            parseContact(line, info);
            break;
          case "summary":
            info.summary += (info.summary ? " " : "") + line;
            break;
          case "skills":
            parseSkills(line, info);
            break;
          case "education":
            parseEducation(line, info);
            break;
          case "experience":
            parseExperience(line, info);
            break;
          case "projects":
            parseProject(line, info);
            break;
          case "certifications":
            parseCertification(line, info);
            break;
          case "languages":
            parseLanguage(line, info);
            break;
          default:
            // First non-empty lines are name and title
            if (!info.name) {
              info.name = line;
            } else if (!info.title) {
              info.title = line;
            }
        }
      }
    }

    // Validation
    if (!info.name || !info.title) {
      throw new Error("Name and Job Title are required at the beginning");
    }

    console.log("✅ Resume parsed successfully");
    console.log("Extracted Information:", info);

    return info;
  } catch (error) {
    throw new Error(`Parsing error: ${error.message}`);
  }
}

function parseContact(line, info) {
  const [key, value] = line.split(":").map((s) => s.trim());
  if (key && value) {
    const cleanKey = key.toLowerCase().replace(/[\s-]/g, "");
    info.contact[cleanKey] = value;
  }
}

function parseSkills(line, info) {
  // Handle both "- Skill" and "Category: skill1, skill2" formats
  if (line.includes("-")) {
    const skill = line.split("-")[1]?.trim();
    if (skill) info.skills.push(skill);
  } else if (line.includes(":")) {
    const [category, skills] = line.split(":").map((s) => s.trim());
    if (skills) {
      skills.split(",").forEach((skill) => {
        const trimmed = skill.trim();
        if (trimmed) info.skills.push(trimmed);
      });
    }
  }
}

function parseEducation(line, info) {
  // Handle education entries in the new pipe-separated format:
  // Degree|Degree Abbreviation
  // City|State
  // Specialization
  // University/College
  // Graduation date/Pursuing

  const lastEdu = info.education[info.education.length - 1];

  if (line.includes("|")) {
    const parts = line.split("|").map((s) => s.trim());

    // If no last education entry, or last entry already has city filled, create new entry
    if (!lastEdu || lastEdu.city) {
      // First line: Degree|Degree Abbreviation - create new education entry
      if (parts.length >= 2) {
        const education = {
          degree: parts[0] || "",
          degreeAbbreviation: parts[1] || "",
          city: "",
          state: "",
          specialization: "",
          college: "",
          graduationDate: "",
        };
        info.education.push(education);
      }
    } else {
      // Second line: City|State - fill in city and state for last education entry
      if (parts.length >= 2) {
        lastEdu.city = parts[0] || "";
        lastEdu.state = parts[1] || "";
      }
    }
  } else {
    // Subsequent lines for the last education entry
    if (lastEdu) {
      if (!lastEdu.specialization) {
        // Third line: Specialization
        lastEdu.specialization = line.trim();
      } else if (!lastEdu.college) {
        // Fourth line: University/College
        lastEdu.college = line.trim();
      } else if (!lastEdu.graduationDate) {
        // Fifth line: Graduation date/Pursuing
        lastEdu.graduationDate = line.trim();
      }
    }
  }
}

function parseExperience(line, info) {
  // Handle various experience formats
  if (
    line.includes("Employee:") ||
    line.includes("Position:") ||
    line.includes("Title:")
  ) {
    const title = line.split(":")[1]?.trim() || "";
    const experience = {
      employeeTitle: title,
      company: "",
      location: "",
      duration: { startDate: "", endDate: "" },
      description: [],
    };
    info.experience.push(experience);
  } else if (line.includes("Employer:") || line.includes("Company:")) {
    const lastExp = info.experience[info.experience.length - 1];
    if (lastExp) {
      const [company, location] = line.split(":")[1]?.trim().split(" - ") || [
        "",
        "",
      ];
      lastExp.company = company?.trim() || "";
      lastExp.location = location?.trim() || "";
    }
  } else if (line.includes("Duration:") || line.includes("Date:")) {
    const lastExp = info.experience[info.experience.length - 1];
    if (lastExp) {
      const [startDate, endDate] = line
        .split(":")[1]
        ?.trim()
        .split(/\s*[-–]\s*/) || ["", ""];
      lastExp.duration = {
        startDate: startDate?.trim() || "",
        endDate: endDate?.trim() || "",
      };
    }
  } else if (line.startsWith("-")) {
    const lastExp = info.experience[info.experience.length - 1];
    if (lastExp) {
      const desc = line.substring(1).trim();
      if (desc) lastExp.description.push(desc);
    }
  }
}

function parseProject(line, info) {
  if (line.startsWith("-")) {
    const project = line.substring(1).trim();
    if (project) info.projects.push(project);
  }
}

function parseCertification(line, info) {
  if (line.startsWith("-")) {
    const cert = line.substring(1).trim();
    if (cert) info.certifications.push(cert);
  }
}

function parseLanguage(line, info) {
  if (line.includes("-")) {
    const lang = line.split("-")[1]?.trim();
    if (lang) info.languages.push(lang);
  } else if (!line.startsWith("Language")) {
    if (line.trim()) info.languages.push(line.trim());
  }
}

export default extractInformation;
