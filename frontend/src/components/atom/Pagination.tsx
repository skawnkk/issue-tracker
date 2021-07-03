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
  const handlePage = async (page: number) => {
    setPage(page);
    const movePage = await getOtherPageIssues;
    if (movePage) nextPage((page) => page + 1);
  };
  const pageArray = new Array(totalPages).fill(0).map((_, idx) => (
    <PageButton onClick={() => handlePage(idx + 1)} isCurrentPage={isCurrentPage(idx + 1)}>
      {idx + 1}
    </PageButton>
  ));
  const pageRange = () => {
    for (let i = 0; i < (totalPages as number); i++) {
      pageButton(i);
    }
  };
  const pageButton = (i: number) => <div>{i + 1}</div>;

  return (
    <PaginationBlock>
      <div className='prevNextBtn'>{`<Previous`}</div>
      {pageArray}
      <div className='prevNextBtn'>{`Next>`}</div>
    </PaginationBlock>
  );
}

export default React.memo(Pagination);

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
  .prevNextBtn {
    color: ${({ theme }) => theme.color.blue};
  }
`;
interface pageBtnProp {
  isCurrentPage: boolean;
}
const PageButton = styled.div<pageBtnProp>`
  width: 30px;
  color: ${({ theme, isCurrentPage }) => (isCurrentPage ? theme.color.white : theme.color.black)};
  background-color: ${({ theme, isCurrentPage }) =>
    isCurrentPage ? theme.color.blue : theme.color.white};
  &:active {
    background-color: ${({ theme }) => theme.color.blue};
  }
`;
