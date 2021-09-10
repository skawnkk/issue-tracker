export default interface newAPItype {
  ISSUE: {
    GET: { ALL: string; FILTER: string };
    POST: string;
  };

  ISSUE_DETAIL: {
    GET: { CLICKED: (id: number) => string; OPEN: string; CLOSE: string };
    PATCH: {
      FILTER: (id: number, type: string) => string;
      TITLE: (issueId: number) => string;
    };
    POST: {
      FILE: string;
      COMMENTS: (issueId: number) => string; //POST_PATCH
    };
  };
  MILESTONE: {
    GET: { ALL: (status: string) => string };
    POST: { CREATE: string };
    PATCH: {
      EDIT: (milestoneID: number) => string;
      OPEN_CLOSE: (status: string) => string;
    };
    DELETE: (milestoneID: number) => string;
  };
  LABEL: {
    PATCH: (id: number) => string;
    DELETE: (id: number) => string;
    GET: string;
    POST: string;
  };
  SIGN: {
    LOGIN: (code: string) => string;
    LOGOUT: string;
    USER: string;
  };
  TAB: string;
}
