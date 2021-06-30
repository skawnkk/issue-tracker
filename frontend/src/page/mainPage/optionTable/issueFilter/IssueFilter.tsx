import React, { ReactElement, useRef } from 'react';
import styled from 'styled-components';
import IssueFilterModal from './IssueFilterModal';
import SearchInput from './SearchInput';
import useToggle from 'hooks/useToggle';
import IssueFilterBtn from './IssueFilterBtn';

export default function IssueFilter(): ReactElement {
  const filterButtonRef = useRef<HTMLDivElement>(null);
  const filterModalRef = useRef<HTMLDivElement>(null);
  const { open } = useToggle({ toggle: [filterButtonRef], modal: filterModalRef });

  return (
    <>
      <IssueFilterBlock>
        <IssueFilterBtn filterButtonRef={filterButtonRef} />
        <SearchInput />
      </IssueFilterBlock>
      {open && <IssueFilterModal modalRef={filterModalRef} />}
    </>
  );
}

const IssueFilterBlock = styled.div`
  display: flex;
  .filter__btn {
  }
`;
