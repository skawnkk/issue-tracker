import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import useToggle from 'hooks/useToggle';
import OptionItem from 'page/detailIssuePage/detailIssueOption/OptionItem';
import TabModal from 'components/common/tabModal/TabModal';
import { useRecoilValue } from 'recoil';
import { selectedTabState, selectedTabType } from 'store/issueInfoStore';

interface Props {
  id: number;
}

export default function DetailIssueOption({ id }: Props) {
  const [selectedOption, setSelectedOption] = useState<selectedTabType>(EMPTY_OPTIONS);
  const selectedOptionData = useRecoilValue(selectedTabState);
  const assigneeToggle = useRef<HTMLDivElement>(null);
  const labelToggle = useRef<HTMLDivElement>(null);
  const milestoneToggle = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const TAB_OPTIONS = [
    { key: 'assignee', name: '담당자', ref: assigneeToggle },
    { key: 'label', name: '레이블', ref: labelToggle },
    { key: 'milestone', name: '마일스톤', ref: milestoneToggle },
  ];

  const { open } = useToggle({
    toggle: [assigneeToggle, labelToggle, milestoneToggle],
    modal: modalRef,
  });

  useEffect(() => {
    if (open) return;
    setSelectedOption(selectedOptionData);
  }, [open, selectedOptionData]);

  //(담당자 + ,라벨 + )같은 OPTION ITEM
  const issueOptionList = TAB_OPTIONS.map(({ key, name, ref }) => (
    <OptionItem
      key={key}
      optionKey={key}
      optionName={name}
      optionRef={ref}
      selectedOption={selectedOption}
    />
  ));

  return (
    <DetailIssueOptionWrapper>
      <DetailIssueOptionBlock>{issueOptionList}</DetailIssueOptionBlock>
      {open && <TabModal modalRef={modalRef} className='detail-option__modal' />}
    </DetailIssueOptionWrapper>
  );
}

const EMPTY_OPTIONS = {
  assignee: [],
  label: [],
  milestone: null,
};

const DetailIssueOptionWrapper = styled.div`
  position: relative;
  .detail-option__modal {
    top: 0;
    left: -300px;
  }
`;

const DetailIssueOptionBlock = styled.div`
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.color.lineGrey};
  over-flow: hidden;
  height: min-content;
  & > div {
    padding: 34px 32px;
    & > div:first-child {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
    }
    &:not(:last-child) {
      border-bottom: 1px solid ${({ theme }) => theme.color.lineGrey};
    }
  }
`;
