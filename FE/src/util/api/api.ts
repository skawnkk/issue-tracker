import APItype from "util/api/apiType";

const basicURL = process.env.REACT_APP_DB_BASIC_URL;
export const authorizedHeaders = (token: string | null) => ({
  Authorization: `Bearer ${token}`,
});

const API: APItype = {
  ISSUE: {
    GET: { ALL: basicURL + `/issues?`, FILTER: basicURL + `/issues/search?` },
    POST: basicURL + `/issues/form`,
  },
  ISSUE_DETAIL: {
    GET: {
      CLICKED: (id) => basicURL + "/issues/" + id,
      OPEN: basicURL + `/issues?status=close`,
      CLOSE: basicURL + `/issues?status=open`,
    },
    PATCH: {
      FILTER: (id, type) => basicURL + `/issues/${id}/${type}s`,
      TITLE: (issueId) => basicURL + `/issues/${issueId}/title`,
    },
    POST: {
      FILE: basicURL + `/images`,
      COMMENTS: (issueId) => basicURL + `/issues/${issueId}/comments`,
    },
  },
  MILESTONE: {
    GET: { ALL: (status) => basicURL + `/milestones?status=${status}` },
    POST: { CREATE: basicURL + `/milestones` },
    PATCH: {
      EDIT: (milestoneID) => basicURL + `/milestones/${milestoneID}`,
      OPEN_CLOSE: (status) => basicURL + `/milestones?status=${status}`,
    },
    DELETE: (milestoneID) => basicURL + `/milestones/${milestoneID}`,
  },
  LABEL: {
    GET: basicURL + "/labels",
    PATCH: (id) => basicURL + "/labels/" + id,
    DELETE: (id) => basicURL + "/labels/" + id,
    POST: basicURL + "/labels",
  },
  SIGN: {
    LOGIN: (code: string) => basicURL + "/login?code=" + code,
    LOGOUT: basicURL + "/logout",
    USER: basicURL + `/userInfo`,
  },
  TAB: basicURL + `/issues/form`,
};

export default API;
