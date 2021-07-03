import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { getIssuesInfoState } from 'store/issueInfoStore';
import { controlLoginState } from 'store/loginStore';
import { useHistory } from 'react-router-dom';
import IssueListHeader from 'page/mainPage/issueTable/issueTableHeader/IssueTableHeader';
import IssueItem from 'page/mainPage/issueTable/IssueItem';
import Pagination from 'components/atom/Pagination';
export default function IssueTable(): ReactElement {
  const history = useHistory();
  const resetLoginState = useResetRecoilState(controlLoginState);
  const issuesInfoData = useRecoilValue(getIssuesInfoState); //?구조분해타입어케~
  let issueList, totalPages;
  if (!issuesInfoData) {
    localStorage.clear();
    resetLoginState();
    history.push('/');
  } else {
    issueList = issuesInfoData.issues.map((issue) => <IssueItem key={issue.id} issue={issue} />);
    totalPages = issuesInfoData.totalPages;
  }

  return (
    <IssueTableBlock>
      <div className='issue-table'>
        <IssueListHeader />
        {issueList}
      </div>
      <div className='pagenation'>
        <Pagination totalPages={totalPages} />
      </div>
    </IssueTableBlock>
  );
}

const IssueTableBlock = styled.div`
  .issue-table {
    min-width: 680px;
    border-radius: 16px;
    border: 1px solid ${({ theme }) => theme.color.lineGrey};
  }
  .pagenation {
    display: flex;
    justify-content: center;
  }
`;
