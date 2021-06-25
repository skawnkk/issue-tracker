interface APItype {
  getIssue: string;
  tabType: string;
  createIssue: string;
  labelURL: string;
  getFileURL: string;
  getMilestone: (status?: string) => string;
  createMilestone:string;
  editDeleteMilestone:(milestoneID: number) => string;
  getUserInfo: string;
  login: (code: string) => string;
  getIssueDetail: (id: number) => string;
  editIssueTitle: (issueId: number) => string;
  editLabel: (id: number) => string;
  editIssueDetailOption: (issueId: number, type: string) => string;
}

export const authorizedHeaders = (token: string | null) => ({ Authorization: `Bearer ${token}` });

const basicURL = `http://3.37.76.224/api`;

const API: APItype = {
  getIssue: basicURL + `/issues?status=`,
  tabType: basicURL + `/issues/form`,
  createIssue: basicURL + `/issues/form`,
  getFileURL: basicURL + `/images`,
  getMilestone: (status ='open') => basicURL + `/milestones?status=${status}`, //get & close milestone
  createMilestone : basicURL + `/milestones`,
  editDeleteMilestone : (milestoneID) => basicURL + `/milestones/${milestoneID}`,
  login: (code: string) => basicURL + '/login?code=' + code,
  getUserInfo: basicURL + `/userInfo`,
  getIssueDetail: (id) => basicURL + '/issues/' + id,
  editIssueTitle: (issueId: number) => basicURL + `/issues/${issueId}/title`,
  labelURL: basicURL + '/labels',
  editLabel: (id) => basicURL + '/labels/' + id,
  editIssueDetailOption: (id, type) => basicURL + `/issues/${id}/${type}s`,
};

export default API;
