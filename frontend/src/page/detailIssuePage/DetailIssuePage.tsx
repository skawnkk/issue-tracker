import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  CommentType,
  LabelType,
  LoginUserType,
  MilestoneType,
  UserType,
} from 'components/common/tabModal/tapDataType';
import DetailIssueHeader from 'page/detailIssuePage/detailHeader/DetailIssueHeader';
import CommentList from './commentList/CommentList';
import IssueDetailOption from 'page/createIssuePage/issueDetailOption/IssueDetailOption';
import { ReactComponent as IssueDeleteBtn } from 'assets/icon/IssueDeleteBtn.svg';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { detailIdState, getDetailIssueData } from 'store/detailStore';

//api에 작성자가 누구인지 있어야될 것 같다.
export interface DetailIssueType {
  id: number;
  title: string;
  status: boolean;
  createdDateTime: string;
  owner: LoginUserType;
  comments: Array<CommentType> | [];
  assignees: Array<UserType> | [];
  labels: Array<LabelType> | [];
  milestone: MilestoneType | null;
}

export default function DetailIssuePage() {
  const pagePaths = window.location.pathname.split('/');
  const issueNum = +pagePaths[pagePaths.length - 1];
  const setDetailIssueId = useSetRecoilState(detailIdState);
  const issueData = useRecoilValue(getDetailIssueData); //fetch해온 데이터 사용예정

  useEffect(() => setDetailIssueId(issueNum), []);

  if (!issueData) return null;
  return (
    <DetailIssuePageBlock>
      <DetailIssueHeader issueData={issueData} />
      <div className='detail__main'>
        <CommentList comments={issueData.comments} />
        <div className='detail__option'>
          <IssueDetailOption />
          <div className='issue__delete-btn'>
            <IssueDeleteBtn />
          </div>
        </div>
      </div>
    </DetailIssuePageBlock>
  );
}

const DetailIssuePageBlock = styled.div`
  padding: 50px 80px;
  .detail__main {
    display: grid;
    grid-template-columns: 80% 20%;
    padding-top: 33px;
  }
  .issue__delete-btn {
    margin-top: 1rem;
    margin-right: 2rem;
    display: flex;
    justify-content: flex-end;
  }
`;
