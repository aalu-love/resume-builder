function AddProject(props) {
    const { setResumeContext } = props;

    const onClick = () => {
        setResumeContext(
            (prv) =>
                `${prv}Projects
- Project Name
- Project Name
- Project Name\n\n`,
        );
    };
    return (
        <div className="add-project">
            <button onClick={() => onClick()}>Add Project</button>
        </div>
    );
}

export default AddProject;
