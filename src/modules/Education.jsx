import { Header } from "./Header";

export function Education({ education, title }) {
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
