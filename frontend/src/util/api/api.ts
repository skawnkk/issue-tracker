interface APItype {
  getIssue: string;
  tabType: string;
  createIssue: string;
  getFileURL: string;
  getMilestone: string;
  getUserInfo: string;
  login: (code: string) => string;
  getIssueDetail: (id: number) => string;
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
};

export default API;
