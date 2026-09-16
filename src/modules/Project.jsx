import { Header } from "./Header";

export function Projects({ projects, title }) {
  return (
    <div className={title.toLowerCase()}>
      <div className="section">
        <div className="header">
          <Header title={title} />
        </div>
        <div className="body">
          <ul>
            {projects.map(({ title, description }, index) => (
              <ProjectItem
                key={index}
                title={title}
                description={description}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ProjectItem({ title, description }) {
  return (
    <li>
      <div className="project-item">
        <p>
          <strong>{title}</strong>
          <p>{description}</p>
        </p>
      </div>
    </li>
  );
}
