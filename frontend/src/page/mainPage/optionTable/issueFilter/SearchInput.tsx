import React, { ChangeEvent, ReactElement, useState, useEffect, KeyboardEvent } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { filterSearchInputState, resetSelectedTab, searchWordState } from 'store/issueInfoStore';
import SearchIcon from '@material-ui/icons/Search';

interface Props {}

export default function SearchInput({}: Props): ReactElement {
  const searchInput = useRecoilValue(filterSearchInputState);
  // const [searchWord, setSearchWord] = useRecoilState(searchWordState);
  const [searchWord, setSearchWord] = useState('');
  const resetSelectOption = useResetRecoilState(resetSelectedTab);

  const [inputState, setInputState] = useState(searchInput);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value);
  };

  useEffect(() => {
    console.log('1');
    setInputState(searchInput + ' ' + searchWord);
  }, [searchInput]);

  useEffect(() => {
    console.log('2');
    setInputState(searchInput + ' ' + searchWord);
  }, [searchWord]);

  const handelSubmit = (e: KeyboardEvent) => {
    if (e.key !== 'Enter') return;
    setSearchWord(inputState);
    resetSelectOption();
    (e.target as HTMLInputElement)?.blur();
    //issueType = inputState => 파싱
    //setFilterIssueType(issueType)
  };

  const handleFocus = () => setInputState('');
  const handleBlur = () => setInputState(searchInput);

  return (
    <SearchInputBlock>
      <SearchIcon />
      <Input
        value={inputState}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyPress={handelSubmit}
      ></Input>
    </SearchInputBlock>
  );
}

const SearchInputBlock = styled.div`
  padding: 0px 10px;
  display: flex;
  min-width: 372px;
  width: fit-content;
  height: 40px;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.color.inputBg};
  border-radius: 0px 11px 11px 0px;
`;

const Input = styled.input`
  min-width: 300px;
  width: 450px;
  height: 40px;
  border: none;
  background-color: ${({ theme }) => theme.color.transparent};
  &:focus {
    outline: none;
  }
`;
