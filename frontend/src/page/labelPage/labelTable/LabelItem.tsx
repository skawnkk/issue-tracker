import styled from 'styled-components';
import LabelBadge from 'components/atom/LabelBadge';
import { ReactComponent as DeleteIcon } from 'assets/icon/DeleteIcon.svg';
import { ReactComponent as EditIcon } from 'assets/icon/EditIcon.svg';
import { LabelType } from 'components/common/tabModal/tapDataType';

interface Props {
  label: LabelType;
}

export default function LabelItem({ label: { name, color, description } }: Props) {
  return (
    <LabelItemBlock>
      <LabelBadge color={color} desc={name} className='label__badge' />
      <div className='label__description'>{description}</div>
      <div className='label__edit'>
        <div>
          <EditIcon className='label__btn' />
          <span>편집</span>
        </div>
        <div className='delete__btn'>
          <DeleteIcon className='label__btn' />
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
  .label__btn {
    margin-right: 5px;
  }
  .delete__btn {
    color: ${({ theme }) => theme.color.red};
  }
`;
