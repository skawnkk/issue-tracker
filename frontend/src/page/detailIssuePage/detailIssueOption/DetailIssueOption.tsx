import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import useToggle from 'hooks/useToggle';
import OptionItem from 'page/detailIssuePage/detailIssueOption/OptionItem';
import TabModal from 'components/common/tabModal/TabModal';
import { useRecoilValue } from 'recoil';
import {
  selectedTabState,
  selectedTabType,
  issueFilterSelectState,
  getTabInfoState,
} from 'store/issueInfoStore';
import { editIssueDetailOption } from 'util/api/fetchIssueDetail';

interface Props {
  id: number;
}

export default function DetailIssueOption({ id }: Props) {
  const [selectedOption, setSelectedOption] = useState<selectedTabType>(EMPTY_OPTIONS);
  const optionData = useRecoilValue(getTabInfoState);
  const selectedOptionData = useRecoilValue<selectedTabType>(selectedTabState);
  const selectedOptionType = useRecoilValue(issueFilterSelectState);

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
    // if (selectedOptionType === 'assignee') {
    //   const selectedAssignee = selectedOptionData.assignee.map((v) => v.id);
    //   const newAssignee = assigneeData
    //     .map((assignee) => {
    //       if (selectedAssignee.includes(assignee.id)) return { ...assignee, assigned: true };
    //       return assignee;
    //     })
    //     .map(({ id, assigned }) => ({ id, isAssigned: assigned }));

    //   const fetchData = { assignees: newAssignee };
    //   editIssueDetailOption(id, selectedOptionType, fetchData);
    // } else if (selectedOptionType === 'label') {
    // } else if (selectedOptionType === 'milestone') {
    // }
  }, [open, selectedOptionData]);

  const getSelectOptionData = (type) => {
    let selectedData;

    if (selectedOptionData[type] instanceof Array)
      selectedData = selectedOptionData[type].map((v) => v.id);
    else selectedData = selectedOptionData[type].id;

    const newOptionData = optionData[type]
      .map((data) => {
        if (selectedData.includes(data.id))
          return type === 'assignee' ? { ...data, assigned: true } : { ...data, checked: true };
        return data;
      })
      .map((data) => {
        return type === 'assignee'
          ? { id: data.id, isAssigned: data.assigned }
          : { id: data.id, isChecked: data.checked };
      });
  };

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
