function AddContact(props) {
    const { setResumeContext } = props;

    const onClick = () => {
        setResumeContext(
            (prv) =>
                `${prv}Contact\nAddress: Your Address\nPhone: Your Phone Number\nEmail: Your Email\nLinkedIn: Your LinkedIn Profile\nPortfolio: Your Portfolio Website\nGithub: Your GitHub Profile\n\n`,
        );
    };
    return (
        <div className="add-contact">
            <button onClick={() => onClick()}>Add Contact</button>
        </div>
    );
}

export default AddContact;
