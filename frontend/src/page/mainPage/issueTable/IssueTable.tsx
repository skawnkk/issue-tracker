import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { getIssuesInfoState } from 'store/issueInfoStore';
import { controlLoginState } from 'store/loginStore';
import { useHistory } from 'react-router-dom';
import IssueListHeader from 'page/mainPage/issueTable/issueTableHeader/IssueTableHeader';
import IssueItem from 'page/mainPage/issueTable/IssueItem';

export default function IssueTable(): ReactElement {
  const history = useHistory();
  const resetLoginState = useResetRecoilState(controlLoginState);
  const issuesInfoData = useRecoilValue(getIssuesInfoState);

  if (!issuesInfoData) {
    localStorage.clear();
    resetLoginState();
    history.push('/');
  }

  const issueList = issuesInfoData?.issues?.map((issue) => (
    <IssueItem key={issue.id} issue={issue} />
  ));

  return (
    <IssueTableBlock>
      <IssueListHeader />
      {issueList}
    </IssueTableBlock>
  );
}

const IssueTableBlock = styled.div`
  min-width: 680px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.color.lineGrey};
`;
