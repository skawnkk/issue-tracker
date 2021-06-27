import APItype from 'util/api/apiType';

const basicURL = process.env.REACT_APP_DB_BASIC_URL;

export const authorizedHeaders = (token: string | null) => ({
	Authorization: `Bearer ${token}`
});

const API: APItype = {
	ISSUE_MAIN: {
		GET: basicURL + `/issues?status=`,
		CREATE: basicURL + `/issues/form`
	},
	ISSUE_DETAIL: {
		GET: (id) => basicURL + '/issues/' + id,
		EDIT: {
			OPTION: (id, type) => basicURL + `/issues/${id}/${type}s`,
			TITLE: (issueId) => basicURL + `/issues/${issueId}/title`,
			FILE: basicURL + `/images`
		}
	},
	MILESTONE: {
		GET: (status = 'open') => basicURL + `/milestones?status=${status}`,
		CREATE: basicURL + `/milestones`,
		EDIT: (milestoneID) => basicURL + `/milestones/${milestoneID}`,
		DELETE: (milestoneID) => basicURL + `/milestones/${milestoneID}`
	},
	LABEL: {
		EDIT: (id) => basicURL + '/labels/' + id,
		DELETE: (id) => basicURL + '/labels/' + id,
		CREATE: basicURL + '/labels',
		GET: basicURL + '/labels'
	},
	LOGIN: {
		ACCESS: (code: string) => basicURL + '/login?code=' + code,
		USER: basicURL + `/userInfo`
	},
	TAB: basicURL + `/issues/form`
};

const _API: APItype = {
	getIssue: basicURL + `/issues?status=`,
	tabType: basicURL + `/issues/form`,
	createIssue: basicURL + `/issues/form`,
	getFileURL: basicURL + `/images`,
	getMilestone: (status = 'open') => basicURL + `/milestones?status=${status}`, //get & close milestone
	createMilestone: basicURL + `/milestones`,
	editDeleteMilestone: (milestoneID) => basicURL + `/milestones/${milestoneID}`,
	login: (code: string) => basicURL + '/login?code=' + code,
	getUserInfo: basicURL + `/userInfo`,
	getIssueDetail: (id) => basicURL + '/issues/' + id,
	editIssueTitle: (issueId: number) => basicURL + `/issues/${issueId}/title`,
	labelURL: basicURL + '/labels',
	editLabel: (id) => basicURL + '/labels/' + id,
	editIssueDetailOption: (id, type) => basicURL + `/issues/${id}/${type}s`
};

export default API;
