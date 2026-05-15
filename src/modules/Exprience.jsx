import { Header } from "./Header";

export function Experience({ title, experiences }) {
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
