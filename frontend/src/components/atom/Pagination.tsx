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
  const handlePage = async (page: number) => {
    setPage(page);
    const movePage = await getOtherPageIssues;
    if (movePage) nextPage((page) => page + 1);
  };
  const pageArray = new Array(totalPages).fill(0).map((_, idx) => (
    <div className='page' onClick={() => handlePage(idx + 1)}>
      {idx + 1}
    </div>
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
    &:hover {
      border-radius: 10px;
      border: 1px solid ${({ theme }) => theme.color.lineGrey};
    }
    // &:active {
    //   background-color: ${({ theme }) => theme.color.blue};
    // }
    margin: 5px;
    padding: 5px;
  }
  display: flex;
  .prevNextBtn {
    color: ${({ theme }) => theme.color.blue};
  }
  .page {
    width: 30px;
  }
`;
