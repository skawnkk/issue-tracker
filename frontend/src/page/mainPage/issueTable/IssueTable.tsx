import { ReactElement, Suspense } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { getIssuesInfoState } from 'store/issueInfoStore';
import IssueListHeader from 'page/mainPage/issueTable/issueTableHeader/IssueTableHeader';
import IssueItem from 'page/mainPage/issueTable/IssueItem';
import Pagination from 'components/atom/Pagination';
import LoadingProgress from 'components/atom/LoadingProgress';
import RenderError from 'page/errorPage/renderError';
export default function IssueTable(): ReactElement {
  const issuesInfoData = useRecoilValue(getIssuesInfoState); //?구조분해타입어케~
  let issueList, totalPages;

  if (typeof issuesInfoData !== 'number') {
    issueList = issuesInfoData.issues.map((issue) => <IssueItem key={issue.id} issue={issue} />);
    totalPages = issuesInfoData.totalPages;
  } else RenderError(issuesInfoData);

  return (
    <IssueTableBlock>
      <div className='issue-table'>
        <IssueListHeader />
        <Suspense fallback={<LoadingProgress />}>{issueList}</Suspense>
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
