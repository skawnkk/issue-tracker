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

export default async function fetchIssueDetail(id: number): Promise<IssueDetailType> {
  const token = localStorage.getItem('token');
  const response = await fetch(API.getIssueDetail(id), {
    headers: authorizedHeaders(token),
  });
  const issueDetailData = await response.json();
  return issueDetailData;
}
