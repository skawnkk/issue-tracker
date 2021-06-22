import React, {useState, ChangeEvent} from 'react'
import styled from 'styled-components';
import PrimaryOutlinedButton from 'components/atom/PrimaryOutlinedButton'
import { headerMode } from 'store/detailStore'
import { useSetRecoilState } from 'recoil'
import { DetailHeaderProps } from 'page/detailIssuePage/detailType'

export default function HeaderEditMode({issueNumber, title}:DetailHeaderProps){
  const setHeaderMode = useSetRecoilState(headerMode)
  const [editTitle, setEditTitle] = useState(title)
  const handleCancelClick = () =>{
    setHeaderMode({view: true, edit: false})
  }
  const handleChange = (e:ChangeEvent<HTMLInputElement>) =>{
    setEditTitle(e.target.value)
  }
  const handleSubmit = ()=>{
    // editIssueTitle(IsssueID)
    //제목을 변경한 후에, 응답결과를 보고 추후 처리....
    //아마 editTitle => realTitle recoil로 변경하지 않을까? 또는 상세페이지 새로고침되게 해서 새로 렌더링!
  }
  const editIssuTitle = async (IsssueID:number) => {
    try{ 
      // const response = await fetch(API.editIssueTitle(IsssueID))
      //editTitle을 바디에 넣어주어야함
    }catch(error){
      console.log(error)
    }
  }
  return (

    <HeaderEditBlock>
      <div className='header__input__title'>
        <input className='issue__input__title' value={editTitle} onChange={handleChange}/>
      </div>
      <div className='header__edit__btn'>
        <PrimaryOutlinedButton value='× 편집 취소' onClick={handleCancelClick}/>
        <PrimaryOutlinedButton value='편집 완료' onClick={handleSubmit}/>
      </div>
    </HeaderEditBlock>
  )
}

const HeaderEditBlock = styled.div`
display: flex;
justify-content: space-between;
.issue__input__title{
  min-width: 709px;
  font-size: ${({ theme }) => theme.size.lg}px;
  height: 46px;
  border: none;
  border-radius: 11px;
  background-color: ${({ theme }) => theme.color.inputBg};
  margin-bottom: 1rem;
  &:focus {
    text-decoration: none;
    background-color: ${({ theme }) => theme.color.white};
  }
}
.header__edit__btn{

}
`