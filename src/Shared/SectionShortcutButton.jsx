function SectionShortcutButton({
  label,
  snippet,
  setResumeContext,
  className,
}) {
  const onClick = () => {
    setResumeContext((prev) => {
      const separator = prev && !prev.endsWith("\n") ? "\n" : "";
      return `${prev}${separator}${snippet}\n\n`;
    });
  };

  return (
    <div className={className}>
      <button type="button" onClick={onClick}>
        {label}
      </button>
    </div>
  );
}

export default SectionShortcutButton;
