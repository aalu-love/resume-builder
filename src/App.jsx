import { useState } from 'react';
import extractInformation from './helper/ResumeBuilderHelper';
import './App.scss';

function App() {
	const [page, setPage] = useState(0);
	const [data, setResumeDetail] = useState({});
	const [isLoading, setLoading] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [resumeContext, setResumeContext] = useState('');

	const handleTextareaChange = event => {
		setResumeContext(event.target.value);
	};

	const handleGenerate = resumeContextInfo => {
		console.log(resumeContextInfo);
		if (resumeContextInfo === '') {
			setShowAlert(true);
			setTimeout(() => {
				setShowAlert(false);
			}, 2000);
		} else {
			setLoading(false);
			const tempData = extractInformation(resumeContext);
			setResumeDetail(tempData);
			setLoading(true);
			setPage(1);
		}
	};

	const propComp = { loading: isLoading, data };

	return (
		<>
			{page === 0 ? (
				<>
					{showAlert && <div className='alert'>Please fill in the textarea before generating the resume.</div>}
					<p>
						<ol>
							<li>
								Open the <a href='https://github.com/aalu-love/resume-builder'>Resume Builder</a> link and follow the steps.
							</li>
						</ol>
					</p>
					<textarea id='w3review' name='w3review' rows='50' cols='100' value={resumeContext} onChange={handleTextareaChange} />
					<br />
					<button onClick={() => handleGenerate(resumeContext)}>Generate Resume</button>
				</>
			) : (
				<PageComponent {...propComp} />
			)}
		</>
	);
}

function PageComponent({ data, loading }) {
	return (
		<>
			<div className='a4-page'>
				{loading ? (
					<>
						<span>
							<h2>{data?.name}</h2>
							<p>{data?.title}</p>
						</span>
						<PersonalInfo personalInfo={data?.contact} />
						<Summary summary={data?.summary} />
						<Section title='Skills' list={data?.skills} />
						<Experience title='Experience' experiences={data?.experience} />
						<Education title='Education' education={data?.education} />
						<Projects title='Project' projects={data?.projects} />
						<Section title='Certification' list={data?.certifications} />
						<Languages title='Languages' languages={data?.languages} />
					</>
				) : (
					<></>
				)}
			</div>
		</>
	);
}

function PersonalInfo({ personalInfo }) {
	const { address, phone, email, linkedin, github, portfolio } = personalInfo;

	return (
		<div className='personal-info'>
			<div className='personal-info'>
				<span>
					<table>
						<tbody>
							<tr>
								<td>
									<strong>Address: </strong>
								</td>
								<td>{address}</td>
								<td>
									<strong>Phone: </strong>
								</td>
								<td>{phone}</td>
								<td>
									<strong>Email: </strong>
								</td>
								<td>
									<a href={`mailto:${email}`}>{email}</a>
								</td>
							</tr>
							<tr>
								<td>
									<strong>LinkedIn: </strong>
								</td>
								<td>
									<a href={`https://linkedin.com/in/${linkedin}`} rel='noreferrer'>
										{linkedin}
									</a>
								</td>
								<td>
									<strong>Portfolio: </strong>
								</td>
								<td>{portfolio}</td>
								<td>
									<strong>Github: </strong>
								</td>
								<td>
									<a href={`https://${github}`}>{github}</a>
								</td>
							</tr>
						</tbody>
					</table>
				</span>
			</div>
		</div>
	);
}

function Summary({ summary }) {
	return (
		<div className='summary'>
			<p>{summary}</p>
		</div>
	);
}

function Section({ title, list }) {
	return (
		<div className={title.toLowerCase()}>
			<div className='section'>
				<div className='header'>
					<Header title={title} />
				</div>
				<div className='body'>
					<ul>
						{list.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}

function Experience({ title, experiences }) {
	return (
		<div className={title.toLowerCase()}>
			<div className='section'>
				<div className='header'>
					<Header title={title} />
				</div>
				<div className='body'>
					{experiences?.map((experience, index) => (
						<ExperienceItem key={index} experience={experience} />
					))}
				</div>
			</div>
		</div>
	);
}

function ExperienceItem({ experience }) {
	const { employeeTitle, company, location, duration, description } = experience;

	return (
		<div className='experience-item'>
			<p>
				<strong>{employeeTitle}</strong>
			</p>
			<p>
				<strong>
					{company} - {location}
				</strong>
			</p>
			<p>
				{duration?.startDate} - {duration?.endDate}
			</p>
			<ul>
				{description?.map((detail, index) => (
					<li key={index}>{detail}</li>
				))}
			</ul>
		</div>
	);
}

function Education({ education, title }) {
	return (
		<div className={title.toLowerCase()}>
			<div className='section'>
				<div className='header'>
					<Header title={title} />
				</div>
				<div className='body'>
					{education.map((edu, index) => (
						<EducationItem key={index} education={edu} />
					))}
				</div>
			</div>
		</div>
	);
}

function EducationItem({ education }) {
	const { degree, degreeAbbreviation, college, specialization, graduationDate, state, city } = education;

	return (
		<div className='education-item'>
			<p>
				<strong>
					{degree} ({degreeAbbreviation}) - {city}, {state}
					<br />
					{specialization}
				</strong>
			</p>
			<p>{college}</p>
			<p>{graduationDate}</p>
		</div>
	);
}

function Projects({ projects, title }) {
	return (
		<div className={title.toLowerCase()}>
			<div className='section'>
				<div className='header'>
					<Header title={title} />
				</div>
				<div className='body'>
					<ul>
						{projects.map((project, index) => (
							<ProjectItem key={index} project={project} />
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}

function ProjectItem({ project }) {
	return (
		<li>
			<div className='project-item'>
				<p>{project}</p>
			</div>
		</li>
	);
}

function Languages({ title, languages }) {
	return (
		<div className='section'>
			<div className='header'>
				<Header title={title} />
			</div>
			<div className='body'>
				<ul>
					{languages.map((attr, index) => (
						<li key={index}>{attr}</li>
					))}
				</ul>
			</div>
		</div>
	);
}

function Header({ title }) {
	return (
		<div>
			<h4>{title}</h4>
		</div>
	);
}

export default App;
