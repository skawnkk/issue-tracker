import { useState } from 'react';
import LabelMilestoneTab from 'components/common/LabelMilestoneTab';
import PrimaryOutlinedButton from 'components/atom/PrimaryOutlinedButton';
import PrimaryButton from 'components/atom/PrimaryButton';
import styled from 'styled-components';

interface Props {
  handleCreateClick: () => void;
}

export default function LabelPageHeader({ handleCreateClick }: Props) {
  const [addClick, setAddClick] = useState(false);

  const handleClick = () => {
    setAddClick((addClick) => !addClick);
    handleCreateClick();
  };
  return (
    <LabelPageHeaderBlock>
      <LabelMilestoneTab />
      {!addClick ? (
        <PrimaryButton value={'+ 추가'} onClick={handleClick} />
      ) : (
        <PrimaryOutlinedButton value={'× 닫기'} onClick={handleClick} />
      )}
    </LabelPageHeaderBlock>
  );
}

const LabelPageHeaderBlock = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;
