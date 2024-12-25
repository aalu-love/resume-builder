import { useRef, useState } from "react";
import extractInformation from "./helper/ResumeBuilderHelper";
import Template from "./helper/Template";

import "./App.scss";
import AddName from "./Shared/AddName/AddName";
import AddContact from "./Shared/AddContact/AddContact";
import AddSummary from "./Shared/AddSummary/AddSummary";
import AddSkills from "./Shared/AddSkills/AddSkills";
import AddEducation from "./Shared/AddEducation/AddEducation";
import AddExprience from "./Shared/AddExprience/AddExprience";
import AddProject from "./Shared/AddProject/AddProject";
import AddCertification from "./Shared/AddCertification/AddCertification";
import AddLanguage from "./Shared/AddLanguage/AddLanguage";

function App() {
    const [page, setPage] = useState(0);
    const [data, setResumeDetail] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showError, setError] = useState("");
    const [resumeContext, setResumeContext] = useState("");

    const handleTextareaChange = (event) => {
        setResumeDetail(null); // Clear the data
        setResumeContext(event.target.value);
    };

    const showMessage = (message, time = 2000) => {
        setError(message);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, time);
    };

    const handleGenerate = async (resumeContextInfo) => {
        if (resumeContextInfo === "") {
            showMessage(
                "Please fill in the textarea before generating the resume.",
            );
        } else {
            setLoading(true);
            try {
                const data = extractInformation(resumeContextInfo);
                console.log(data);
                setResumeDetail(data);
            } catch (error) {
                console.error(error);
                showMessage(
                    `An error occurred while generating the resume. ${error}`,
                ); // Display a generic error message
                // Handle the error here, e.g., log it or perform additional error handling as needed
            } finally {
                setLoading(false);
                setPage(1);
            }
        }
    };

    const propComp = { loading: isLoading, data, setPage, setResumeDetail };

    return (
        <>
            {page === 0 ? (
                <>
                    <div className="builder-wrapper">
                        <p className="header">Resume Builder</p>
                        <div className="container">
                            <div className="template-container">
                                {showAlert && (
                                    <div className="alert">{showError}</div>
                                )}
                                <Template />
                            </div>
                            <ShortcutButton
                                setResumeContext={setResumeContext}
                            />
                            <div className="input-container">
                                <textarea
                                    id="w3review"
                                    name="w3review"
                                    value={resumeContext}
                                    onChange={handleTextareaChange}
                                />
                                <br />
                                <button onClick={() => setResumeContext("")}>
                                    Reset
                                </button>
                                <button
                                    onClick={() =>
                                        handleGenerate(resumeContext)
                                    }
                                >
                                    Generate Resume
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <PageComponent {...propComp} />
            )}
        </>
    );
}

function ShortcutButton(props) {
    const { setResumeContext } = props;
    return (
        <div className="shortcut-btn">
            <AddName setResumeContext={setResumeContext} />
            <AddContact setResumeContext={setResumeContext} />
            <AddSummary setResumeContext={setResumeContext} />
            <AddSkills setResumeContext={setResumeContext} />
            <AddEducation setResumeContext={setResumeContext} />
            <AddExprience setResumeContext={setResumeContext} />
            <AddProject setResumeContext={setResumeContext} />
            <AddCertification setResumeContext={setResumeContext} />
            <AddLanguage setResumeContext={setResumeContext} />
        </div>
    );
}

function PageComponent({ data, loading, setPage }) {
    const {
        name,
        title,
        contact,
        summary,
        skills,
        experience,
        education,
        projects,
        certifications,
        languages,
    } = data;

    const [hide, setHide] = useState(true);

    const printRef = useRef();

    const printResume = async () => {
        //         if (printRef.current) {
        //             const printContent = printRef.current.innerHTML;
        //             const newWindow = window.open("", "_blank", "width=800,height=600");
        //             newWindow.document.open();
        // 			newWindow.document.element
        //             newWindow.document.write(`
        // 			<html>
        // 				<head>
        // 				<title>Print</title>
        // 				<link href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap" rel="stylesheet" />
        // 				<style>
        // 					.a4-page {
        //         font-family: Arial, Helvetica, sans-serif;
        //     width: 595px;
        //     height: 842px;
        //     a {
        //         color: black;
        //         text-decoration: none;
        //     }
        //     table {
        //         padding-top: 1%;
        //     }
        //     table,
        //     td {
        //         font-size: 0.8rem;
        //         padding-right: 8px;
        //     }
        //     .summary,
        //     .skills,
        //     .experience,
        //     .project,
        //     .education,
        //     .certification {
        //         padding-bottom: 1%;
        //     }
        //     .summary {
        //         p {
        //             padding-top: 1%;
        //             font-size: 0.8rem;
        //         }
        //     }
        //     .education {
        //         .education-item {
        //             margin-bottom: 1%;
        //         }
        //     }
        //     .experience {
        //         .experience-item {
        //             padding-bottom: 1%;
        //         }
        //     }
        //     .pcl-wrapper {
        //         display: flex;
        //         div {
        //             width: 100%;
        //             .header {
        //                 padding-block: 1.5%;
        //             }
        //         }
        //         div:not(:first-child) {
        //             margin-left: 1.5%;
        //         }
        //     }
        // }
        // 				</style>
        // 				</head>
        // 				<body>
        // 				${printContent}
        // 				</body>
        // 			</html>
        // 			`);
        //             newWindow.document.close();
        //             newWindow.print();
        //         }
        await setHide(false);
        await window.print();
        await setHide(true);
    };

    if (loading) {
        return <h1>Loading0000</h1>; // Render nothing if loading is false
    }

    return (
        <div className="print-conatiner">
            {hide && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                    className="btn-group"
                >
                    <button onClick={() => setPage(0)}>&lt; Back</button>
                    <button onClick={printResume}>Print</button>
                </div>
            )}
            <div ref={printRef} className="print-ref">
                <div className="a4-page">
                    <span>
                        <h2>{name}</h2>
                        <p>{title}</p>
                    </span>
                    <PersonalInfo personalInfo={contact} />
                    <Summary summary={summary} />
                    <Section title="Skills" list={skills} />
                    {experience?.length > 0 && (
                        <Experience
                            title="Experience"
                            experiences={experience}
                        />
                    )}
                    {education?.length > 0 && (
                        <Education title="Education" education={education} />
                    )}
                    <div className="pcl-wrapper">
                        {projects?.length > 0 && (
                            <Projects title="Project" projects={projects} />
                        )}
                        {certifications?.length > 0 && (
                            <Section
                                title="Certifications"
                                list={certifications}
                            />
                        )}
                        {languages?.length > 0 && (
                            <Languages
                                title="Languages"
                                languages={languages}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function PersonalInfo({ personalInfo }) {
    const { address, phone, email, linkedin, github, portfolio } = personalInfo;

    return (
        <div className="personal-info">
            <div className="personal-info">
                <span>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <strong>Address: </strong>
                                </td>
                                <td>{address}</td>
                                <td>
                                    <strong>Phone: </strong>
                                </td>
                                <td>{phone}</td>
                                <td>
                                    <strong>Email: </strong>
                                </td>
                                <td>
                                    <a href={`mailto:${email}`}>{email}</a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>LinkedIn: </strong>
                                </td>
                                <td>
                                    <a
                                        href={`https://linkedin.com/in/${linkedin}`}
                                        rel="noreferrer"
                                    >
                                        {linkedin}
                                    </a>
                                </td>
                                <td>
                                    <strong>Portfolio: </strong>
                                </td>
                                <td>{portfolio}</td>
                                <td>
                                    <strong>Github: </strong>
                                </td>
                                <td>
                                    <a href={`https://${github}`}>{github}</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </span>
            </div>
        </div>
    );
}

function Summary({ summary }) {
    return (
        <div className="summary">
            <p>{summary}</p>
        </div>
    );
}

function Section({ title, list }) {
    return (
        <div className={title.toLowerCase()}>
            <div className="section">
                <div className="header">
                    <Header title={title} />
                </div>
                <div className="body">
                    <ul>
                        {list.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

function Experience({ title, experiences }) {
    return (
        <div className={title.toLowerCase()}>
            <div className="section">
                <div className="header">
                    <Header title={title} />
                </div>
                <div className="body">
                    {experiences?.map((experience, index) => (
                        <ExperienceItem key={index} experience={experience} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function ExperienceItem({ experience }) {
    const { employeeTitle, company, location, duration, description } =
        experience;

    return (
        <div className="experience-item">
            <p>
                <strong>{employeeTitle}</strong>
            </p>
            <p>
                <strong>
                    {company} {location ? ` - ${location}` : ""}
                </strong>
            </p>
            <p>
                {duration?.startDate} - {duration?.endDate}
            </p>
            <ul>
                {description?.map((detail, index) => (
                    <li key={index}>{detail}</li>
                ))}
            </ul>
        </div>
    );
}

function Education({ education, title }) {
    console.log(title, education);
    return (
        <div className={title.toLowerCase()}>
            <div className="section">
                <div className="header">
                    <Header title={title} />
                </div>
                <div className="body">
                    {education.map((edu, index) => (
                        <EducationItem key={index} education={edu} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function EducationItem({ education }) {
    const {
        degree,
        degreeAbbreviation,
        college,
        specialization,
        graduationDate,
        state,
        city,
    } = education;

    return (
        <div className="education-item">
            <p>
                <strong>
                    {degree} ({degreeAbbreviation}) - {city}, {state}
                    <br />
                    {specialization}
                </strong>
            </p>
            <p>{college}</p>
            <p>{graduationDate}</p>
        </div>
    );
}

function Projects({ projects, title }) {
    return (
        <div className={title.toLowerCase()}>
            <div className="section">
                <div className="header">
                    <Header title={title} />
                </div>
                <div className="body">
                    <ul>
                        {projects.map((project, index) => (
                            <ProjectItem key={index} project={project} />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

function ProjectItem({ project }) {
    return (
        <li>
            <div className="project-item">
                <p>{project}</p>
            </div>
        </li>
    );
}

function Languages({ title, languages }) {
    return (
        <div className="section">
            <div className="header">
                <Header title={title} />
            </div>
            <div className="body">
                <ul>
                    {languages.map((attr, index) => (
                        <li key={index}>{attr}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

function Header({ title }) {
    return (
        <div>
            <h4>{title}</h4>
        </div>
    );
}

export default App;
