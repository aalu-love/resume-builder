function AddSkills(props) {
    const { setResumeContext } = props;

    const onClick = () => {
        setResumeContext(
            (prv) => `${prv}Skills
- Programming: Programming Languages
- Databases: Databases
- Frameworks/Libraries: Frameworks and Libraries
- Build Tools: Build Tools
- Tools/Technologies: Tools and Technologies
- Web Development: Web Development Technologies
- Data Analysis: Data Analysis Skills
- Version Control: Version Control Tools
- Operating Systems: Operating Systems\n\n`,
        );
    };
    return (
        <div className="add-skills">
            <button onClick={() => onClick()}>Add Skills</button>
        </div>
    );
}

export default AddSkills;
