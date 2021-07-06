import { useEffect } from 'react';
import styled from 'styled-components';
import {
  CommentType,
  LabelType,
  LoginUserType,
  MilestoneType,
  UserType,
} from 'components/common/tabModal/tapDataType';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { detailIdState, getDetailIssueData } from 'store/detailStore';
import { selectedTabState } from 'store/issueInfoStore';
import { ReactComponent as IssueDeleteBtn } from 'assets/icon/IssueDeleteBtn.svg';
import DetailIssueHeader from 'page/detailIssuePage/detailHeader/DetailIssueHeader';
import DetailIssueOption from 'page/detailIssuePage/detailIssueOption/DetailIssueOption';
import CommentList from './commentList/CommentList';
import Logout from 'util/Logout';
import ErrorPage from 'page/errorPage/ErrorPage';
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
  const setDetailIssueId = useSetRecoilState(detailIdState);
  const setSelectdedOption = useSetRecoilState(selectedTabState);
  const pagePaths = window.location.pathname.split('/');
  const issueNum = +pagePaths[pagePaths.length - 1];
  useEffect(() => setDetailIssueId(issueNum), []);

  const issueData = useRecoilValue(getDetailIssueData);

  useEffect(() => {
    if (!issueData || typeof issueData === 'number') return;
    const { assignees: assignee, labels: label, milestone } = issueData;
    const newSelectedOption = { assignee, label, milestone };
    setSelectdedOption(newSelectedOption);
  }, [issueData]);
  if (typeof issueData === 'number') Logout();
  if (!issueData) return <ErrorPage />;
  return (
    <DetailIssuePageBlock>
      <DetailIssueHeader issueData={issueData} />
      <div className='detail__main'>
        <CommentList issueId={issueData.id} comments={issueData.comments} />
        <div className='detail__option'>
          <DetailIssueOption id={issueData.id} />
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
