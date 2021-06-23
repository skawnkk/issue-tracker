import { LabelType } from 'components/common/tabModal/tapDataType';
import styled from 'styled-components';
import PrimaryButton from 'components/atom/PrimaryButton';
import LabelEdit from './LabelEdit';
import useInput from 'hooks/useInput';
import { createLabel } from 'util/api/fetchLabel';

interface Props {
  className?: string;
  title: string;
  label?: LabelType;
}

export default function LabelEditForm({ className, title, label = DEFAULT_LABEL }: Props) {
  const titleInput = useInput(label.name);
  const descriptionInput = useInput(label.description);
  const colorInput = useInput(label.color.backgroundColorCode);

  const handleSubmitClick = () => {
    //textColor는 나중에 계산으로 적용
    const newLabelData = {
      name: titleInput.defaultValue,
      description: descriptionInput.defaultValue,
      color: {
        backgroundColorCode: colorInput.defaultValue,
        textColorCode: '#000',
      },
    };
    //create인 경우
    if (label.id === 0) createLabel(newLabelData);
  };

  return (
    <LabelEditFormBlock className={className}>
      <div className='form__title'>{title}</div>
      <div className='form__edit'>
        <LabelEdit {...{ titleInput, descriptionInput, colorInput, label }} />
      </div>
      <div className='form__submit'>
        <PrimaryButton onClick={handleSubmitClick} value='+ 완료' className='form__submit-btn' />
      </div>
    </LabelEditFormBlock>
  );
}

const DEFAULT_LABEL = {
  id: 0,
  name: '',
  description: '',
  checked: false,
  color: {
    backgroundColorCode: '#EFF0F6',
    textColorCode: '#000',
  },
};

const LabelEditFormBlock = styled.div`
  padding: 2rem;
  margin-bottom: 1.5rem;
  border: 1px solid ${({ theme }) => theme.color.lineGrey};
  border-radius: 16px;
  .form__title {
    font-size: 2rem;
    margin-bottom: 3rem;
  }
  .form__submit {
    display: flex;
    justify-content: flex-end;
    .form__submit-btn {
      width: 120px;
      background-color: #007aff;
    }
  }
`;
