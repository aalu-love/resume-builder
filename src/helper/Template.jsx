function Template() {
  return (
    <div className="template-card">
      <h2>Build your resume in 3 simple steps</h2>
      <div className="template">
        <p>
          Use the buttons to insert sections, then edit the text. When ready,
          click Generate Resume.
        </p>
        <ol>
          <li>Add your name, title, and contact details first.</li>
          <li>Fill out summary, skills, education, and experience.</li>
          <li>Press Generate Resume to preview the finished layout.</li>
        </ol>
        <div className="template-note">
          Tip: Keep entries short and clear, then adjust the final PDF if
          needed.
        </div>
      </div>
    </div>
  );
}

export default Template;
