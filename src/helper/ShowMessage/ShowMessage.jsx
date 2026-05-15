function ShowMessage({ show, message, type = "error" }) {
  if (!show || !message) {
    return null;
  }

  return (
    <div className={`alert alert--${type}`}>
      <span className="alert__icon">{type === "error" ? "!" : "✓"}</span>
      <span className="alert__text">{message}</span>
    </div>
  );
}

export default ShowMessage;
