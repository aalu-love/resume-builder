import { Header } from "./Header";

export function Languages({ title, languages }) {
  return (
    <div className="section">
      <div className="header">
        <Header title={title} />
      </div>
      <div className="body">
        <ul>
          {languages.map((attr, index) => (
            <li key={index}>
              <p>{attr}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
