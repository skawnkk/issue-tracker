import styled from 'styled-components';
import { labelMilestoneClickedState } from 'store/labelMilestoneStore';
import { useSetRecoilState } from 'recoil';
import LabelPageHeader from 'page/labelPage/labelPageHeader/LabelPageHeader';
import LabelTable from './labelTable/LabelTable';

export default function LabelPage() {
  const setLabelMilestoneState = useSetRecoilState(labelMilestoneClickedState);
  setLabelMilestoneState({ label: true, milestone: false });

  return (
    <LabelBlock>
      <LabelPageHeader />
      <LabelTable />
    </LabelBlock>
  );
}

const LabelBlock = styled.div`
  padding: 50px 80px;
`;
