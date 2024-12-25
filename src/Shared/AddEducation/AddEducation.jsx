function AddEducation(props) {
    const { setResumeContext } = props;

    const onClick = () => {
        setResumeContext(
            (prv) => `${prv}Education
Degree (Degree Abbreviation) - City, State
Information Technology
Collage/University Name
(Expected Graduation: August 2023)

Degree (Degree Abbreviation) - City, State
Information Technology
Collage/University Name
September 2021
\n\n`,
        );
    };
    return (
        <div className="add-education">
            <button onClick={() => onClick()}>Add Education</button>
        </div>
    );
}

export default AddEducation;
