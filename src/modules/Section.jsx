import { Header } from "./Header";

export function Section({ title, list }) {
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
