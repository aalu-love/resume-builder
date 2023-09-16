import { useState } from 'react';
import extractInformation from './helper/ResumeBuilderHelper';
import './App.scss';
import Template from './helper/Template';

function App() {
	const [page, setPage] = useState(0);
	const [data, setResumeDetail] = useState({});
	const [isLoading, setLoading] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [showError, setError] = useState('');
	const [resumeContext, setResumeContext] = useState('');

	const handleTextareaChange = event => {
		setResumeContext(event.target.value);
	};

	const showMessage = (message, time = 2000) => {
		setError(message);
		setShowAlert(true);
		setTimeout(() => {
			setShowAlert(false);
		}, time);
	};

	const handleGenerate = resumeContextInfo => {
		setResumeDetail({});
		if (resumeContextInfo === '') {
			showMessage('Please fill in the textarea before generating the resume.');
		} else {
			setLoading(false);
			try {
				const tempData = extractInformation(resumeContext);
				setResumeDetail(tempData);
			} catch (error) {
				console.error(error);
				showMessage(error);
				setResumeDetail({});
				// Handle the error here, e.g., show an error message
			}
			setLoading(true);
		}
	};

	const propComp = { loading: isLoading, data, setPage };

	return (
		<>
			{page === 0 ? (
				<>
					<div className='builder-wrapper'>
						<div className='container'>
							<div className='template-container'>
								{showAlert && <div className='alert'>{showError}</div>}
								<Template />
							</div>
							<div className='input-container'>
								<textarea id='w3review' name='w3review' value={resumeContext} onChange={handleTextareaChange} />
								<br />
								<button onClick={() => setResumeContext('')}>Reset</button>
								<button onClick={() => handleGenerate(resumeContext)}>Generate Resume</button>
							</div>
						</div>
					</div>
				</>
			) : (
				<PageComponent {...propComp} />
			)}
		</>
	);
}

function PageComponent({ data, loading, setPage }) {
	const [hide, setHide] = useState(true);

	const printResume = async () => {
		await setHide(false);
		await window.print();
		await setHide(true);
	};

	if (!loading) {
		return null; // Render nothing if loading is false
	}

	return (
		<>
			<div className='a4-page'>
				{hide && (
					<div style={{ display: 'flex', justifyContent: 'space-between' }} className='btn-group'>
						<button style={{ width: '100px', marginBottom: '1rem' }} onClick={() => setPage(0)}>
							&lt; Back
						</button>
						<button style={{ width: '100px', marginBottom: '1rem' }} onClick={printResume}>
							Print
						</button>
					</div>
				)}

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
