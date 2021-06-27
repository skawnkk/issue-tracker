import API, { authorizedHeaders } from 'util/api/api';
interface NewMilestoneType {
	[key: string]: string;
}

export async function editMilestone(milestoneID: number, newMilestone: NewMilestoneType) {
	const token = localStorage.getItem('token');

	try {
		const response = await fetch(API.MILESTONE.EDIT(milestoneID), {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				...authorizedHeaders(token)
			},
			body: JSON.stringify(newMilestone)
		});
		if (response.status !== 200) throw new Error('잘못된 요청');
		return response.status;
	} catch (error) {
		console.error(error);
	}
}
export async function fetchCreateMilestone(newMilestone: NewMilestoneType) {
	const token = localStorage.getItem('token');
	debugger;
	try {
		const response = await fetch(API.MILESTONE.CREATE, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				...authorizedHeaders(token)
			},
			body: JSON.stringify(newMilestone)
		});
		if (response.status !== 200) throw new Error('잘못된 요청');
		return response.status;
	} catch (error) {
		console.error(error);
	}
}

export async function fetchDeleteMilestone(milesetoneID: number) {
	const token = localStorage.getItem('token');
	try {
		const response = await fetch(API.MILESTONE.DELETE(milesetoneID), {
			method: 'DELETE',
			headers: authorizedHeaders(token)
		});
		if (response.status !== 200) throw new Error('잘못된 요청');
		return response.status;
	} catch (error) {
		console.error(error);
	}
}

export async function fetchHandleMilestone(milestoneID?: number, status: string = 'open') {
	const token = localStorage.getItem('token');
	try {
		const response = await fetch(API.MILESTONE.GET(status), {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				...authorizedHeaders(token)
			},
			body: JSON.stringify({ issueNumbers: [milestoneID] })
		});
		if (response.status !== 200) throw new Error('잘못된 요청입니다.');
		return response.status;
	} catch (error) {
		console.error('마일스톤 닫기 에러:', error);
	}
}
