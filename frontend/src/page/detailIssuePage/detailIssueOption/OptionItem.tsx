import React, { ReactElement, RefObject } from 'react';
import styled from 'styled-components';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import { useSetRecoilState } from 'recoil';
import { issueFilterTypeState, selectedTabType } from 'store/issueInfoStore';
import SelectedTabUser from 'page/createIssuePage/issueDetailOption/SelectedTabUser';
import SelectedTabLabel from 'page/createIssuePage/issueDetailOption/SelectedTabLabel';
import SelectedTabMilestone from 'page/createIssuePage/issueDetailOption/SelectedTabMilestone';

interface Props {
  optionName: string;
  optionKey: string;
  optionRef: RefObject<HTMLDivElement>;
  selectedOption: selectedTabType;
}

export default function OptionItem({ optionName, optionKey, optionRef, selectedOption }: Props) {
  const setOptionType = useSetRecoilState(issueFilterTypeState);

  const handleOptionClick = () => {
    const optionType = { key: optionKey, name: optionName };
    setOptionType(optionType);
  };

  const optionSelectedList: { [key: string]: ReactElement | Array<ReactElement> | null } = {
    assignee: selectedOption.assignee?.map((user) => <SelectedTabUser key={user.id} user={user} />),
    label: selectedOption.label?.map((label) => <SelectedTabLabel key={label.id} label={label} />),
    milestone: selectedOption.milestone ? (
      <SelectedTabMilestone
        key={selectedOption.milestone.id}
        milestone={selectedOption.milestone}
      />
    ) : null,
  };

  return (
    <OptionItemBlock ref={optionRef} onClick={handleOptionClick}>
      <div>
        <span>{optionName}</span>
        <AddOutlinedIcon />
      </div>
      <div>{optionSelectedList[optionKey]}</div>
    </OptionItemBlock>
  );
}

const OptionItemBlock = styled.div``;
