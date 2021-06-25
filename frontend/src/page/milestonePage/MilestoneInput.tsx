import React, { ReactElement, ChangeEvent, Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
interface NewMilestoneType{
 title: string;
 dueDate: string;
 description: string;
}
interface MilestoneInput{
  milestoneInputs: NewMilestoneType
  setMilestoneInputs:Dispatch<SetStateAction<NewMilestoneType>>
}
export default function MilestoneInput({milestoneInputs, setMilestoneInputs}:MilestoneInput):ReactElement{
  const {title, dueDate, description} = milestoneInputs
  const handleChange = (type: string, e:ChangeEvent<HTMLInputElement>) => {
    setMilestoneInputs({...milestoneInputs, [type]: e.target.value})
  }
  return (
    <MilestoneInputBlock>
        <div>
          <input type='text' className='milestone__name' value={title} onChange={(e)=>handleChange('title', e)}/>
          <input type='text' className='milestone__due-date' placeholder='완료일(선택) ex.YYYY-MM-DD' value={dueDate} onChange={(e)=>handleChange('dueDate', e)}/>
        </div>
        <input type='text' className='milestone__description' placeholder='설명(선택)' value={description} onChange={(e)=>handleChange('description', e)}/>
    </MilestoneInputBlock>
  )
}

const MilestoneInputBlock = styled.div`
  div{
  display: flex;
  margin-top: 32px ;
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
  }
}`