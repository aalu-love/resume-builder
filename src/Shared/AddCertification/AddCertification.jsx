function AddCertification(props) {
    const { setResumeContext } = props;

    const onClick = () => {
        setResumeContext(
            (prv) =>
                `${prv}Certifications
- Certification Name
- Certification Name\n\n`,
        );
    };
    return (
        <div className="add-certification">
            <button onClick={() => onClick()}>Add Certification</button>
        </div>
    );
}

export default AddCertification;
