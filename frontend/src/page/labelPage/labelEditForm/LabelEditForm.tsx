import { LabelType } from 'components/common/tabModal/tapDataType';
import React from 'react';
import styled from 'styled-components';
import PrimaryButton from 'components/atom/PrimaryButton';
import LabelEdit from './LabelEdit';

interface Props {
  className?: string;
  title: string;
  label?: LabelType;
}

export default function LabelEditForm({ className, title, label }: Props) {
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
  return (
    <LabelEditFormBlock className={className}>
      <div className='form__title'>{title}</div>
      <div className='form__edit'>
        <LabelEdit label={label ? label : DEFAULT_LABEL} />
      </div>
      <div className='form__submit'>
        <PrimaryButton value='+ 완료' className='form__submit-btn' />
      </div>
    </LabelEditFormBlock>
  );
}

const LabelEditFormBlock = styled.div`
  padding: 2rem;
  margin-bottom: 1.5rem;
  border: 1px solid ${({ theme }) => theme.color.lineGrey};
  border-radius: 16px;
  .form__title {
    font-size: ${({ theme }) => theme.size.md2}px;
    margin-bottom: 2rem;
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
