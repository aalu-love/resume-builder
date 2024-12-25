function AddSummary(props) {
    const { setResumeContext } = props;

    const onClick = () => {
        setResumeContext((prv) => `${prv}Summary\nSummary-About-Yourself\n\n`);
    };
    return (
        <div className="add-summary">
            <button onClick={() => onClick()}>Add Summary</button>
        </div>
    );
}

export default AddSummary;
