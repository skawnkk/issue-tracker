import API, {authorizedHeaders} from 'util/api/api';

type inputsType = {
  title?: string;
  comment: string;
  assignees: number[] | []; //일단이렇게
  labels: number[] | []; //일단이렇게
  milestone: number | null; //일단이렇게
};

export default async function fetchCreateIssue(issueInputs: inputsType) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(API.createIssue, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',...authorizedHeaders(token)
      },
      body: JSON.stringify(issueInputs),
    });
    if (response.status !== 200) throw new Error('잘못된 요청입니다.');
    const issueID = response.json();
    return issueID;
  } catch (err) {
    throw new Error('잘못된 요청입니다.');
  }
}
