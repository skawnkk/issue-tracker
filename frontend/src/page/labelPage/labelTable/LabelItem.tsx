import styled from 'styled-components';
import LabelBadge from 'components/atom/LabelBadge';
import { ReactComponent as DeleteIcon } from 'assets/icon/DeleteIcon.svg';
import { ReactComponent as EditIcon } from 'assets/icon/EditIcon.svg';

export default function LabelItem() {
  const colorData = {
    backgroundColorCode: 'red',
    textColorCode: 'white',
  };

  return (
    <LabelItemBlock>
      <LabelBadge color={colorData} desc={'레이블'} className='label__badge' />
      <div className='label__description'>레이블에 대한 설명</div>
      <div className='label__edit'>
        <div>
          <EditIcon />
          <span>편집</span>
        </div>
        <div className='delete__btn'>
          <DeleteIcon />
          <span>삭제</span>
        </div>
      </div>
    </LabelItemBlock>
  );
}

const LabelItemBlock = styled.div`
  display: grid;
  grid-template-columns: 15% 70% 15%;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.color.lineGrey};
  padding: 32px;
  .label__badge {
    margin: 0;
  }
  .label__description {
    display: flex;
    color: ${({ theme }) => theme.color.fontGrey};
  }
  .label__edit {
    display: flex;
    font-size: ${({ theme }) => theme.size.sm}px;
    justify-content: flex-end;
    div {
      display: flex;
      align-items: center;
      margin-left: 20px;
    }
  }
  .delete__btn {
    color: ${({ theme }) => theme.color.red};
  }
`;
