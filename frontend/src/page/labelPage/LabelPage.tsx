import { useState } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { labelMilestoneClickedState } from 'store/labelMilestoneStore';
import LabelPageHeader from 'page/labelPage/labelPageHeader/LabelPageHeader';
import LabelTable from 'page/labelPage/labelTable/LabelTable';
import LabelEditForm from 'page/labelPage/labelEditForm/LabelEditForm';

export default function LabelPage() {
  const [isCreateLabel, setIsCreateLabel] = useState(false);
  const handleCreateClick = () => setIsCreateLabel((isCreateLabel) => !isCreateLabel);
  const setLabelMilestoneState = useSetRecoilState(labelMilestoneClickedState);
  setLabelMilestoneState({ label: true, milestone: false });

  const handelCancelClick = () => setIsCreateLabel(false);

  return (
    <LabelBlock>
      <LabelPageHeader {...{ handleCreateClick }} />
      {isCreateLabel && (
        <LabelEditForm title='새로운 레이블 추가' handelCancelClick={handelCancelClick} />
      )}
      <LabelTable />
    </LabelBlock>
  );
}

const LabelBlock = styled.div`
  padding: 50px 80px;
`;
