let educationIndex = -1;
let educationInfoIndex = 0;

let exprienceIndex = -1;
let experienceInfoDesc = [];

let info = {
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
    let section = "";

    const lines = text.split("\n").map((line) => line?.trim());

    try {
        for (const line of lines) {
            if (line === "Contact") {
                info.contact = {};
                section = "contact";
            } else if (line === "Summary") {
                info.summary = "";
                section = "summary";
            } else if (line === "Skills") {
                info.skills = [];
                section = "skills";
            } else if (line === "Education") {
                educationIndex = -1;
                educationInfoIndex = 0;
                info.education = [];
                section = "education";
            } else if (
                line === "Experience / Internships" ||
                line === "Experiences"
            ) {
                exprienceIndex = -1;
                info.experience = [];
                experienceInfoDesc = [];
                section = "experience";
            } else if (line === "Projects" || line === "Project") {
                info.projects = [];
                section = "projects";
            } else if (line === "Certifications" || line === "Certification") {
                info.certifications = [];
                section = "certifications";
            } else if (line === "Languages") {
                info.languages = [];
                section = "languages";
            } else {
                if (line !== "") {
                    switch (section) {
                        case "contact":
                            {
                                const contactInfo = line.split(":");
                                const key =
                                    contactInfo?.length > 1 &&
                                    contactInfo[0]
                                        ?.trim()
                                        .toLowerCase()
                                        .replace("-", "");
                                const value =
                                    contactInfo?.length > 1 &&
                                    contactInfo[1]?.trim();
                                info.contact[key] = value;
                            }
                            break;
                        case "summary":
                            info.summary += line + " ";
                            break;
                        case "skills":
                            info.skills.push(
                                line !== "" && line.split("- ")[1].trim(),
                            );
                            break;
                        case "education":
                            {
                                const educationProp = { line };
                                EducationDetails(educationProp);
                            }
                            break;
                        case "experience":
                            {
                                const exprienceProp = { line };
                                ExperienceDetails(exprienceProp);
                            }
                            break;
                        case "projects":
                            info.projects.push(line?.slice(1)?.trim());
                            break;
                        case "certifications":
                            info.certifications.push(line?.slice(1)?.trim());
                            break;
                        case "languages":
                            info.languages.push(line.split("- ")[1].trim());
                            break;
                        default:
                            if (!info.name) {
                                info.name = line;
                            } else if (!info.title) {
                                info.title = line;
                            }
                            break;
                    }
                }
            }
        }

        info.summary = info.summary?.trim();

        return info;
    } catch (error) {
        throw new Error(`Error in ${section} section`);
    }
}

function EducationDetails({ line }) {
    educationIndex++;
    switch (educationIndex % 4) {
        case 0:
            {
                const [degreeInfo, stateCity] = line.split(" - ");
                const [degree, degreeAbbreviation] = degreeInfo.split("(");
                const [city, state] = stateCity.split(", ");
                info.education[educationInfoIndex] = {
                    ...info.education[educationInfoIndex],
                    degree: degree.trim(),
                    degreeAbbreviation: degreeAbbreviation
                        .replace(")", "")
                        .trim(),
                    state: state.trim(),
                    city: city.trim(),
                };
            }
            break;
        case 1:
            info.education[educationInfoIndex] = {
                ...info.education[educationInfoIndex],
                specialization: line.trim(),
            };
            break;
        case 2:
            info.education[educationInfoIndex] = {
                ...info.education[educationInfoIndex],
                college: line.trim(),
            };
            break;
        case 3:
            info.education[educationInfoIndex] = {
                ...info.education[educationInfoIndex],
                graduationDate: line.trim(),
            };
            educationInfoIndex++;
            break;
    }
}

function ExperienceDetails({ line }) {
    let expSection = "";

    if (line.startsWith("-")) {
        expSection = "description";
    } else if (line.startsWith("Employee:")) {
        expSection = "employee";
    } else if (line.startsWith("Employer:")) {
        expSection = "employer";
    } else if (line.startsWith("Duration:")) {
        expSection = "duration";
    }

    switch (expSection) {
        case "employee":
            {
                exprienceIndex++;
                const employeeTitle = line.split(":")[1].trim();
                info.experience[exprienceIndex] = {
                    ...info.experience[exprienceIndex],
                    employeeTitle,
                };
            }
            experienceInfoDesc = [];
            break;
        case "employer":
            {
                const [companyRaw, locationRaw] = line
                    .split(":")[1]
                    .trim()
                    .split(" - ");
                const company = companyRaw?.trim();
                const location = locationRaw?.trim();
                info.experience[exprienceIndex] = {
                    ...info.experience[exprienceIndex],
                    company,
                    location,
                };
            }
            break;
        case "duration":
            {
                const [startDate, endDate] = line
                    .split(":")[1]
                    .trim()
                    .split(" - " || " – ");
                console.log(startDate, endDate);
                info.experience[exprienceIndex] = {
                    ...info.experience[exprienceIndex],
                    duration: {
                        startDate: startDate?.trim(),
                        endDate: endDate?.trim(),
                    },
                };
            }
            break;
        case "description":
            {
                const description = line?.split("- ")[1]?.trim();
                experienceInfoDesc.push(description);
                info.experience[exprienceIndex] = {
                    ...info.experience[exprienceIndex],
                    description: experienceInfoDesc,
                };
            }
            break;
    }
}

export default extractInformation;
