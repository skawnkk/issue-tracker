import React, { useState, ChangeEvent, Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { useSetRecoilState } from 'recoil'
import { milestoneTrigger } from 'store/labelMilestoneStore'
import Title from 'components/atom/Title'
import PrimaryButton from 'components/atom/PrimaryButton'
import PrimaryOutlinedButton from'components/atom/PrimaryOutlinedButton'
import { MilestoneType } from 'components/common/tabModal/tapDataType'
import { fetchCreateMilestone, editMilestone } from 'util/api/fetchHandleMilestone'

interface EditType{
  type?: string
  milestone?: MilestoneType
  setEditMode?: Dispatch<SetStateAction<boolean>>
}
export default function MilestoneAdd({type='create', setEditMode, milestone}:EditType){

  const setMilestoneTrigger = useSetRecoilState(milestoneTrigger)
  const initTitle = milestone?.title||'마일스톤 제목'
  const initDate = milestone?.dueDate||'ex.YYYY-MM-DD'
  const initDesc = milestone?.description||'설명'
  const milestoneID = milestone?.id||0 
  const [milestoneInputs, setMilestoneInputs] = useState({title:initTitle, dueDate:initDate, description:initDesc})
  const {title, dueDate, description} = milestoneInputs
 
  const handleSubmit = () => {
    const newMilestone = {title, dueDate, description}
  
    if(type==='create') fetchCreateMilestone(newMilestone)
    else editMilestone(milestoneID, newMilestone)
    
    if(setEditMode) setEditMode(false)
    setMilestoneTrigger(trigger=>trigger+1)
  }

  const handleChange = (type: string, e:ChangeEvent<HTMLInputElement>) => {
    if(type==='title') setMilestoneInputs({...milestoneInputs, title: e.target.value})
    if(type==='dueDate') setMilestoneInputs({...milestoneInputs, dueDate: e.target.value})
    if(type==='description') setMilestoneInputs({...milestoneInputs, description: e.target.value})
  }

  const handleClick = () => {if(setEditMode) setEditMode(false)}

  const pageTitle = (type==='create')?'새로운 마일스톤 추가':'마일스톤 편집'
  return (
    <MilestoneAddBlock>
      <Title className='milestone__add'>{pageTitle}</Title>
      <MilestoneInputBlock>
        <div>
          <input type='text' className='milestone__name' value={title} onChange={(e)=>handleChange('title', e)}/>
          <input type='text' className='milestone__due-date' placeholder='완료일(선택) ex.YYYY-MM-DD' value={dueDate} onChange={(e)=>handleChange('dueDate', e)}/>
        </div>
        <input type='text' className='milestone__description' placeholder='설명(선택)' value={description} onChange={(e)=>handleChange('description', e)}/>
      </MilestoneInputBlock>
      <div className='milestone__add__submit' >
        {type!=='create' && <PrimaryOutlinedButton value={'× 취소'} onClick={handleClick}/>}
        <PrimaryButton value={'+ 완료'} onClick={handleSubmit}/>
      </div>
    </MilestoneAddBlock>
  )
}

const MilestoneAddBlock = styled.div`
margin: 24px 0;
padding: 32px;
border-radius: 16px;
border: 1px solid ${({ theme }) => theme.color.lineGrey};
.milestone__add__submit{
  display: flex;
  justify-content: flex-end;
}
`

const MilestoneInputBlock = styled.div`
div{
  display: flex;
  margin-top: 32px;
}
input{
  display: block;
  width: 50%;
  height: 56px;
  padding: 0 24px;
  margin-right: 16px;
  margin-bottom: 16px;
  border: none;
  background-color: ${({ theme }) => theme.color.inputBg};
  font-size: ${({ theme }) => theme.size.md}px;
  border-radius: 11px;
  &:focus {
  text-decoration: none;
  background-color: ${({ theme }) => theme.color.white};
  }
  .milestone__due-date{
    margin: 0 0 24px 0;
    width: 100%;
  }
}`
