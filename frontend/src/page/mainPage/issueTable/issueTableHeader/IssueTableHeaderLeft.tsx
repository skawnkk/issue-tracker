import { ReactElement } from 'react';
import styled from 'styled-components';
import CheckBox from 'components/atom/CheckBox';
import AdjustRoundedIcon from '@material-ui/icons/AdjustRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { getIssuesInfoState, issueTypeState, IssuesInfoStateType } from 'store/issueInfoStore';
import RenderError from 'page/errorPage/renderError';
export default function IssueListHeaderLeft(): ReactElement {
  const setIssueType = useSetRecoilState(issueTypeState);
  const issuesInfoData = useRecoilValue(getIssuesInfoState);
  if (typeof issuesInfoData === 'number') RenderError(issuesInfoData);
  let countInfo = issuesInfoData as IssuesInfoStateType;
  let openIssueCount = countInfo.count.openedIssue;
  let closeIssueCount = countInfo.count.closedIssue;
  const handleOpenClick = () => setIssueType('open');
  const handleCloseClick = () => setIssueType('close');
  return (
    <IssueListHeaderLeftBlock>
      <CheckBox />
      <div className='issue-header__filter-tab'>
        <div onClick={handleOpenClick}>
          <AdjustRoundedIcon /> <span>열린 이슈 ({openIssueCount})</span>
        </div>
        <div onClick={handleCloseClick}>
          <CheckRoundedIcon /> <span>닫힌 이슈 ({closeIssueCount})</span>
        </div>
      </div>
    </IssueListHeaderLeftBlock>
  );
}

const IssueListHeaderLeftBlock = styled.div`
  display: flex;
  .issue-header__filter-tab {
    display: flex;
    div {
      display: flex;
      align-items: center;
      margin-right: 10px;
      cursor: pointer;
    }
  }
`;
