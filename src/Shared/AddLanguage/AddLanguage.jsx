function AddLanguage(props) {
    const { setResumeContext } = props;

    const onClick = () => {
        setResumeContext(
            (prv) =>
                `${prv}Languages
- English (Fluent)
- Hindi (Native)\n\n`,
        );
    };
    return (
        <div className="add-language">
            <button onClick={() => onClick()}>Add Language</button>
        </div>
    );
}

export default AddLanguage;
