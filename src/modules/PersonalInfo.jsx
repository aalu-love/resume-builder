export function PersonalInfo({ personalInfo }) {
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
