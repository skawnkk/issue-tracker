import React, { Suspense } from 'react';
import styled from 'styled-components';
import { useResetRecoilState } from 'recoil';
import { resetTabClickedState } from 'store/labelMilestoneTabStore';
import IssueTable from 'page/mainPage/issueTable/IssueTable';
import OptionTable from 'page/mainPage/optionTable/OptionTable';
import LoadingProgress from 'components/atom/LoadingProgress';
import ErrorBoundary from 'ErrorBoundary';
export default function MainPage() {
  const resetTabClicked = useResetRecoilState(resetTabClickedState);
  resetTabClicked();
  return (
    <ErrorBoundary>
      <MainPageBlock>
        <Suspense fallback={<LoadingProgress />}>
          <OptionTable />
        </Suspense>
        <Suspense fallback={<LoadingProgress />}>
          <IssueTable />
        </Suspense>
      </MainPageBlock>
    </ErrorBoundary>
  );
}

const MainPageBlock = styled.div`
  padding: 50px 80px;
`;
