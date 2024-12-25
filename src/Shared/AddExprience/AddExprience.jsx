function AddExprience(props) {
    const { setResumeContext } = props;

    const onClick = () => {
        setResumeContext(
            (prv) =>
                `${prv}Experiences
Employee: Your Job Title
Employer: Company Name
Duration: Start Date - End Date
- Key Responsibility or Achievement
- Key Responsibility or Achievement
- Key Responsibility or Achievement

Employee: Your Job Title
Employer: Company Name
Duration: Start Date - End Date
- Key Responsibility or Achievement
- Key Responsibility or Achievement
- Key Responsibility or Achievement\n\n`,
        );
    };
    return (
        <div className="add-exprience">
            <button onClick={() => onClick()}>Add Exprience</button>
        </div>
    );
}

export default AddExprience;
