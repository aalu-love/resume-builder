export function PersonalInfo({ personalInfo }) {
  const { address, phone, email, linkedin, github, portfolio } = personalInfo;

  return (
    <div className="personal-info">
      <span>
        <p>
          {email} | {phone} | {linkedin ? `linkedin.com/${linkedin}` : ""} |{" "}
          {github ? `github.com/${github}` : ""} | {portfolio} | {address}
        </p>
      </span>
    </div>
  );
}
