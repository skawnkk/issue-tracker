import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { titleEditMode } from 'store/detailStore';
import { issueTypeState } from 'store/issueInfoStore';
import Title from 'components/atom/Title';
import PrimaryOutlinedButton from 'components/atom/PrimaryOutlinedButton';
import { DetailHeaderProps } from 'page/detailIssuePage/detailType';
import { fetchIssueClose } from 'util/api/fetchCreateIssue';

export default function HeaderViewMode({ issueNumber, title }: DetailHeaderProps) {
  const setTitleEditMode = useSetRecoilState(titleEditMode);
  const [issueStatus, setIssueStatus] = useRecoilState(issueTypeState);
  const issueStateValue: string = issueStatus === 'open' ? '이슈닫기' : '이슈열기';
  const handleEditClick = () => setTitleEditMode(true);
  const handleOpenClose = async () => {
    const response = await fetchIssueClose(issueNumber);
    if (response === 200) setIssueStatus(issueStatus === 'open' ? 'close' : 'open');
  };

  return (
    <HeaderViewBlock>
      <div className='header__title'>
        <Title className='issue__title'>{title}</Title>
        <Title className='issue__number'>{'#' + issueNumber}</Title>
      </div>
      <div className='header__edit__btn'>
        <PrimaryOutlinedButton value='제목편집' onClick={handleEditClick} />
        <PrimaryOutlinedButton value={issueStateValue} onClick={handleOpenClose} />
      </div>
    </HeaderViewBlock>
  );
}

const HeaderViewBlock = styled.div`
  display: flex;
  justify-content: space-between;
  .header__title {
    font-size: 2rem;
    display: flex;
    margin-bottom: 1rem;
    .issue__number {
      color: ${({ theme }) => theme.color.fontGrey};
      margin-left: 1rem;
    }
  }
`;
