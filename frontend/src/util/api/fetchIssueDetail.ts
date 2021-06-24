import {
  CommentType,
  UserType,
  LabelType,
  MilestoneType,
  LoginUserType,
} from 'components/common/tabModal/tapDataType';
import API, { authorizedHeaders } from './api';

type IssueDetailType = {
  id: number;
  title: string;
  status: boolean;
  createdDateTime: string;
  owner: LoginUserType;
  comments: Array<CommentType> | [];
  assignees: Array<UserType> | [];
  labels: Array<LabelType> | [];
  milestone: MilestoneType | null;
};

export async function fetchIssueDetail(id: number): Promise<IssueDetailType> {
  const token = localStorage.getItem('token');
  const response = await fetch(API.getIssueDetail(id), {
    headers: authorizedHeaders(token),
  });
  const issueDetailData = await response.json();
  return issueDetailData;
}

export async function editIssueAssignee(issueId: number) {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(API.editIssueAssignee(issueId), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...authorizedHeaders(token) },
    });
    if (response.status === 200) return true;
    else throw Error;
  } catch (error) {
    throw error;
  }
}
