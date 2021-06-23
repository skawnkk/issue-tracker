import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import Title from 'components/atom/Title';
import PrimaryOutlinedButton from 'components/atom/PrimaryOutlinedButton';
import { titleEditMode } from 'store/detailStore';
import { DetailHeaderProps } from 'page/detailIssuePage/detailType';
export default function HeaderViewMode({ issueNumber, title }: DetailHeaderProps) {
  const setTitleEditMode = useSetRecoilState(titleEditMode);

  const handleEditClick = () => setTitleEditMode(true);

  return (
    <HeaderViewBlock>
      <div className='header__title'>
        <Title className='issue__title'>{title}</Title>
        <Title className='issue__number'>{'#' + issueNumber}</Title>
      </div>
      <div className='header__edit__btn'>
        <PrimaryOutlinedButton value='제목편집' onClick={handleEditClick} />
        <PrimaryOutlinedButton value='이슈닫기' />
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
