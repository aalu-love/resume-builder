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
