import { useState } from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
  label?: string;
  defaultValue?: string;
  onChange?: ({ target }: { target: HTMLInputElement }) => void;
  [key: string]: any;
}

export default function InputField({ label, className, defaultValue, onChange, ...props }: Props) {
  const [isFocus, setIsFocus] = useState(false);
  const handleOnFocus = () => setIsFocus(true);
  const handleOnBlur = () => setIsFocus(false);
  console.log(isFocus);
  return (
    <InputFieldBlock isFocus={isFocus} className={className}>
      {label && <div>{label}</div>}
      <input
        type='text'
        defaultValue={defaultValue}
        onChange={onChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        {...props}
      />
    </InputFieldBlock>
  );
}

interface StyleProps {
  isFocus: boolean;
}

const InputFieldBlock = styled.div<StyleProps>`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: ${({ isFocus, theme }) => (isFocus ? theme.color.white : theme.color.bgGrey)};
  border: 1px solid ${({ isFocus, theme }) => (isFocus ? theme.color.lineGrey : theme.color.bgGrey)};
  border-radius: 11px;
  box-shadow: ${({ isFocus }) => isFocus && '0px 4px 8px rgba(149, 157, 165, 0.2)'};
  & > div {
    width: 80px;
    font-size: ${({ theme }) => theme.size.sm}px;
  }
  & > input {
    background-color: ${({ isFocus, theme }) => (isFocus ? theme.color.white : theme.color.bgGrey)};
    border: 1px solid ${({ isFocus, theme }) => (isFocus ? theme.color.white : theme.color.bgGrey)};
    border-radius: 11px;
    width: 90%;
    color: ${({ theme }) => theme.color.fontGrey};
    &:focus {
      outline: none;
    }
  }
`;
