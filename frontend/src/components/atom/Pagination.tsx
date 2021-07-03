import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { searchPage, getIssuesInfoState, getIssueTrigger } from 'store/issueInfoStore';
import styled from 'styled-components';
interface pageType {
  totalPages?: number;
}
function Pagination({ totalPages }: pageType) {
  const nextPage = useSetRecoilState(getIssueTrigger);
  const [page, setPage] = useRecoilState(searchPage);
  const getOtherPageIssues = useRecoilValue(getIssuesInfoState);

  const isCurrentPage = (pageIdx: number) => {
    if (pageIdx === 0) pageIdx = 1;
    return !!(pageIdx === page);
  };
  const isPrevValid = () => (page === 0 || page === 1 ? false : true);
  const isNextValid = () => (page === totalPages ? false : true);

  const handlePage = async (page: number) => {
    setPage(page);
    const movePage = await getOtherPageIssues;
    if (movePage) nextPage((page) => page + 1);
  };
  const handlePrevNext = async (move: number, valid: boolean) => {
    if (!valid) return;
    move ? setPage(page === 0 ? page + 2 : page + 1) : setPage(page - 1);
    const movePage = await getOtherPageIssues;
    if (movePage) nextPage((page) => page + 1);
  };
  const pageArray = new Array(totalPages).fill(0).map((_, idx) => (
    <PageButton onClick={() => handlePage(idx + 1)} isCurrentPage={isCurrentPage(idx + 1)}>
      {idx + 1}
    </PageButton>
  ));
  return (
    <PaginationBlock>
      <PrevNextButton
        onClick={() => handlePrevNext(0, isPrevValid())}
        isPrevValid={isPrevValid()}>{`<Previous`}</PrevNextButton>
      {pageArray}
      <PrevNextButton
        onClick={() => handlePrevNext(+1, isNextValid())}
        isNextValid={isNextValid()}>{`Next>`}</PrevNextButton>
    </PaginationBlock>
  );
}

export default React.memo(Pagination);
interface prevNextBtnProps {
  isPrevValid?: boolean;
  isNextValid?: boolean;
}
interface pageBtnProp {
  isCurrentPage: boolean;
}
const PaginationBlock = styled.div`
  div {
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    &:hover {
      border: 1px solid ${({ theme }) => theme.color.lineGrey};
    }
    margin: 5px;
    padding: 5px;
  }
  display: flex;
`;
const PrevNextButton = styled.div<prevNextBtnProps>`
  color: ${({ theme }) => theme.color.blue};
`;

const PageButton = styled.div<pageBtnProp>`
  width: 30px;
  color: ${({ theme, isCurrentPage }) => (isCurrentPage ? theme.color.white : theme.color.black)};
  background-color: ${({ theme, isCurrentPage }) =>
    isCurrentPage ? theme.color.blue : theme.color.white};
  &:active {
    background-color: ${({ theme }) => theme.color.blue};
  }
`;
