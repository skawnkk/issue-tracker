import styled from 'styled-components';
import LabelItem from 'page/labelPage/labelTable/LabelItem';
import { useRecoilValue } from 'recoil';
import { getLabelData } from 'store/labelStore';

interface Props {}

export default function LabelTable({}: Props) {
  const labelData = useRecoilValue(getLabelData);
  const labelList = labelData.labels.map((label) => <LabelItem key={label.id} label={label} />);

  return (
    <LabelTableBlock>
      <div className='tab__table__header'>{labelData.labelsCount}개의 레이블</div>
      {labelList}
    </LabelTableBlock>
  );
}

const LabelTableBlock = styled.div`
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.color.lineGrey};
  .tab__table__header {
    display: flex;
    justify-content: space-between;
    padding: 18px 32px;
    background-color: ${({ theme }) => theme.color.bgGrey};
    border-radius: 16px 16px 0 0;
    font-weight: ${({ theme }) => theme.weight.bold};
    color: ${({ theme }) => theme.color.fontGrey};
  }
`;
