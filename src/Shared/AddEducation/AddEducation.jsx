function AddEducation(props) {
  const { setResumeContext } = props;

  const onClick = () => {
    setResumeContext(
      (prv) => `${prv}\n\nEducation
Bachelor of Computer Science|BCS
San Francisco|CA
Information Technology
University of Technology
May 2020

Master of Science|MS
New York|NY
Computer Science
State University
Expected Graduation: August 2023\n\n`,
    );
  };
  return (
    <div className="add-education">
      <button onClick={() => onClick()}>Add Education</button>
    </div>
  );
}

export default AddEducation;
