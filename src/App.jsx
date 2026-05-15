import { useRef, useState } from "react";
import extractInformation from "./helper/ResumeBuilderHelper";
import Template from "./helper/Template";
import ShowMessage from "./helper/ShowMessage/ShowMessage";

import "./App.scss";

import {
  PersonalInfo,
  Education,
  Experience,
  Languages,
  Projects,
  Summary,
  Section,
} from "./modules";

import { SECTION_TEMPLATE } from "./helper/sectionTemplate";
import SectionShortcutButton from "./Shared/SectionShortcutButton";

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

  const validateInput = (text) => {
    if (!text || text.trim() === "") {
      return "Please fill in the resume content.";
    }

    const lines = text.split("\n").filter((line) => line.trim());

    if (lines.length < 3) {
      return "Resume needs at least a name, job title, and one section.";
    }

    if (
      !text.includes("Contact") &&
      !text.includes("Summary") &&
      !text.includes("Skills")
    ) {
      return "Please include at least Contact, Summary, or Skills section.";
    }

    return null;
  };

  const handleGenerate = (resumeContextInfo) => {
    const validationError = validateInput(resumeContextInfo);
    if (validationError) {
      showMessage(validationError);
      return;
    }

    setLoading(true);
    try {
      const parsedData = extractInformation(resumeContextInfo);
      setResumeDetail(parsedData);
      setPage(1);
    } catch (error) {
      console.error("Parsing error:", error);
      const errorMsg =
        error.message || "Failed to parse resume. Please check the format.";
      showMessage(errorMsg);
    } finally {
      setLoading(false);
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
                <ShowMessage
                  show={showAlert}
                  message={showError}
                  type="error"
                />
                <Template />
              </div>
              <ShortcutButton setResumeContext={setResumeContext} />
              <div className="input-container">
                <textarea
                  id="w3review"
                  name="w3review"
                  value={resumeContext}
                  onChange={handleTextareaChange}
                />
                <br />
                <button onClick={() => setResumeContext("")}>Reset</button>
                <button onClick={() => handleGenerate(resumeContext)}>
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
      {SECTION_TEMPLATE.map((section) => (
        <SectionShortcutButton
          key={section.label}
          label={`Add ${section.label}`}
          snippet={section.snippet}
          setResumeContext={setResumeContext}
        />
      ))}
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
          {skills?.length > 0 && <Section title="Skills" list={skills} />}
          {experience?.length > 0 && (
            <Experience title="Experience" experiences={experience} />
          )}
          {education?.length > 0 && (
            <Education title="Education" education={education} />
          )}
          <div className="pcl-wrapper">
            {projects?.length > 0 && (
              <Projects title="Project" projects={projects} />
            )}
            {certifications?.length > 0 && (
              <Section title="Certifications" list={certifications} />
            )}
            {languages?.length > 0 && (
              <Languages title="Languages" languages={languages} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
