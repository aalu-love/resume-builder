function AddName(props) {
    const { setResumeContext } = props;

    const onClick = () => {
        setResumeContext(
            (prv) =>
                `${prv}Your Name\nYour Job Title | Your Skills/Expertise\n\n`,
        );
    };
    return (
        <div className="add-name">
            <button onClick={() => onClick()}>Add Name and Title</button>
        </div>
    );
}

export default AddName;
