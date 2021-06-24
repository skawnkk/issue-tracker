interface APItype {
  getIssue: string;
  tabType: string;
  createIssue: string;
  labelURL: string;
  getFileURL: string;
  getMilestone: string;
  getUserInfo: string;
  login: (code: string) => string;
  getIssueDetail: (id: number) => string;
  editIssueTitle: (issueId: number) => string;
  editLabel: (id: number) => string;
  editIssueAssignee: (issueId: number) => string;
}

export const authorizedHeaders = (token: string | null) => ({ Authorization: `Bearer ${token}` });

const basicURL = `http://3.37.76.224/api`;

const API: APItype = {
  getIssue: basicURL + `/issues?status=`,
  tabType: basicURL + `/issues/form`,
  createIssue: basicURL + `/issues/form`,
  getFileURL: basicURL + `/images`,
  getMilestone: basicURL + `/milestones`,
  login: (code: string) => basicURL + '/login?code=' + code,
  getUserInfo: basicURL + `/userInfo`,
  getIssueDetail: (id) => basicURL + '/issues/' + id,
  editIssueTitle: (issueId: number) => basicURL + `/issues/${issueId}/title`,
  labelURL: basicURL + '/labels',
  editLabel: (id) => basicURL + '/labels/' + id,
  editIssueAssignee: (id) => basicURL + '/issues/' + id + '/assignees',
};

export default API;
