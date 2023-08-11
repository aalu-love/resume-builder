function extractInformation(text) {
	let section = '';

	const lines = text.split('\n').map(line => line?.trim());

	const info = {
		name: '',
		title: '',
		contact: {},
		summary: '',
		skills: [],
		education: [],
		experience: [],
		projects: [],
		certifications: [],
		languages: [],
	};
	let educationInfoIndex = 0;
	let educationIndex = 0;

	let experienceInfoDesc = [];
	let experimentIndex = 0;

	let count = 0;

	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	for (const line of lines) {
		if (line === 'Contact') {
			section = 'contact';
		} else if (line === 'Summary') {
			section = 'summary';
		} else if (line === 'Skills') {
			section = 'skills';
		} else if (line === 'Education') {
			section = 'education';
		} else if (line === 'Experience / Internships') {
			section = 'experience';
		} else if (line === 'Projects') {
			section = 'projects';
		} else if (line === 'Certifications') {
			section = 'certifications';
		} else if (line === 'Languages') {
			section = 'languages';
		} else {
			if (line !== '') {
				switch (section) {
					case 'contact':
						{
							const contactInfo = line.split(':');
							const key = contactInfo?.length > 1 && contactInfo[0]?.trim().toLowerCase();
							const value = contactInfo?.length > 1 && contactInfo[1]?.trim();
							info.contact[key] = value;
						}
						break;
					case 'summary':
						info.summary += line + ' ';
						break;
					case 'skills':
						info.skills.push(line !== '' && line);
						break;
					case 'education':
						{
							switch (educationInfoIndex) {
								case 0:
									{
										const educationInfo = line?.split(':');
										const degreeInfo = educationInfo[0]?.split('(');
										const degree = degreeInfo[0]?.trim();
										const degreeAbbreviation = degreeInfo[1]?.replace(')', '')?.trim();
										const specialization = educationInfo[1]?.trim();
										info.education[educationIndex] = {
											...info.education[educationIndex],
											degree,
											degreeAbbreviation,
											specialization,
										};
									}
									break;
								case 1:
									{
										const collegeAndLocation = line?.split('–') || line?.split('-');
										const college = collegeAndLocation[0]?.trim();
										const locationInfo = collegeAndLocation[1]?.split(',');
										const city = locationInfo[0]?.trim();
										const state = locationInfo[1]?.trim();
										info.education[educationIndex] = {
											...info.education[educationIndex],
											college,
											city,
											state,
										};
									}
									break;
								case 2:
									{
										const graduationDate = line?.trim();
										info.education[educationIndex] = {
											...info.education[educationIndex],
											graduationDate,
										};
									}
									break;
							}
							if (educationInfoIndex === 2) {
								educationInfoIndex = 0;
								educationIndex++;
							} else {
								educationInfoIndex++;
							}
						}
						break;
					case 'experience':
						{
							if (line.startsWith('Company:')) {
								const companyAndLocation = line?.split('-');
								const company = companyAndLocation[0]?.split(':')[1]?.trim();
								const location = companyAndLocation[1]?.trim();
								info.experience[experimentIndex] = {
									...info.experience[experimentIndex],
									company,
									location,
								};
							} else if (months.includes(line?.split(' ')[0])) {
								const duration = line?.split('-');
								const startDate = duration[0]?.trim();
								const endDate = duration[1]?.trim();
								info.experience[experimentIndex] = {
									...info.experience[experimentIndex],
									duration: {
										startDate,
										endDate,
									},
								};
							} else {
								if (line?.startsWith('-')) {
									const description = line?.slice(1)?.trim();
									experienceInfoDesc.push(description);
									info.experience[experimentIndex] = {
										...info.experience[experimentIndex],
										description: experienceInfoDesc,
									};
									count++;
								} else {
									if (count > 0) {
										experienceInfoDesc = [];
										experimentIndex++;
									}

									const employeeTitle = line?.trim();
									info.experience[experimentIndex] = {
										...info.experience[experimentIndex],
										employeeTitle,
									};
								}
							}
						}
						break;
					case 'projects':
						info.projects.push(line?.slice(1)?.trim());
						break;
					case 'certifications':
						info.certifications.push(line?.slice(1)?.trim());
						break;
					case 'languages':
						info.languages.push(line);
						break;
					default:
						// Assuming the first line contains the name and the second line contains the title.
						if (!info.name) {
							info.name = line;
						} else if (!info.title) {
							info.title = line;
						}
						break;
				}
			}
		}
	}

	info.summary = info.summary?.trim();

	return info;
}

export default extractInformation;
