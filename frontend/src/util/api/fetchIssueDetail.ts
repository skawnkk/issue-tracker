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

interface patchAssigneeType {
  assignees: { id: number; isAssigned: boolean }[];
}
interface patchLabelType {
  labels: { id: number; isAssigned: boolean }[];
}
interface patchLabelType {
  milestone: { id: number };
}

export async function editIssueDetailOption(
  issueId: number,
  type: string,
  patchData: patchAssigneeType | patchLabelType | patchLabelType
) {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(API.editIssueDetailOption(issueId, type), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...authorizedHeaders(token) },
      body: JSON.stringify(patchData),
    });
    if (response.status === 200) return true;
    else throw Error;
  } catch (error) {
    throw error;
  }
}
