import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import MilestoneIcon from 'components/atom/MilestoneIcon'
import { ReactComponent as DeleteIcon} from 'assets/icon/DeleteIcon.svg';
import { ReactComponent as EditIcon} from 'assets/icon/EditIcon.svg';
import { ReactComponent as CloseIcon} from 'assets/icon/CloseIcon.svg';
import { ReactComponent as CalendarIcon} from 'assets/icon/CalendarIcon.svg';
import CustomizedProgressBars from 'components/atom/Progress'
import { fetchHandleMilestone, fetchDeleteMilestone } from 'util/api/fetchHandleMilestone'
import { MilestoneType } from 'components/common/tabModal/tapDataType'
interface MilestoneItemType{
  milestone: MilestoneType
  setEditMode: Dispatch<SetStateAction<boolean>>
}
export default function MilestoneInfo({milestone, setEditMode}:MilestoneItemType){

  const {id, title, description, dueDate, openedIssueCount, closedIssueCount}:MilestoneType = milestone
  const progress = () =>{
    if(openedIssueCount===0) return 0;
    return openedIssueCount/(openedIssueCount+closedIssueCount)
  }
  const handleClose = () => fetchHandleMilestone(id)
  const handleEdit = () => {
    setEditMode(true)
    //수정api전송
  }
  const handleDelete = () => fetchDeleteMilestone(id)

  return  ( <MilestoneItemBlock>
    <div className='milestone__list__left'>
      <Title>
        <div><MilestoneIcon/>&nbsp;{title}</div>
        <div><CalendarIcon/>&nbsp;{dueDate}</div>
      </Title>
      <div className='milestone__list__desc'>&nbsp;&nbsp;{description}</div>
    </div>

    <div className='milestone__list__right'>
      <div className='milestone__list__edit'>
        <div onClick={handleClose}><CloseIcon/><div>닫기</div></div>
        <div onClick={handleEdit}><EditIcon/><div>편집</div></div>
        <div onClick={handleDelete}><DeleteIcon/><div className='delete'>삭제</div></div>
      </div>
    <div className='milestone__list__progress'>
      <CustomizedProgressBars progress={Number(progress)}/>
      <div className='milestone__state'>
        <div>{Number(progress)}%</div>
        <div>열린 이슈({openedIssueCount})  &nbsp;&nbsp;닫힌 이슈({closedIssueCount})</div>
      </div>
    </div>
    </div>
  </MilestoneItemBlock>) 
}


const MilestoneItemBlock = styled.div`
display: flex;
justify-content: space-between;
border-top: 1px solid ${({ theme }) => theme.color.lineGrey};
padding: 10px;
.milestone__list__desc{
  display: flex;
  padding-top: 5px;
}
.milestone__list__right{
  width: 245px;
}
.milestone__list__edit{
  cursor: pointer;
  display: flex; 
  font-size: ${({ theme }) => theme.size.sm}px;
  justify-content: flex-end;
  div{
    display: flex;
    align-items: center;
    margin-left: 20px;
    div{
      margin-left: 5px;
    }
  }
}
.milestone__state{
  display: flex;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.size.sm}px;
}
.delete{
  color: ${({theme})=>theme.color.red};
}
`
const Title = styled.div`
display: flex;
div{ 
  display: flex;
  align-items:center;
}
div:first-child{
  font-size: ${({ theme }) => theme.size.md2}px;
  font-weight: 800;
  margin-right: 10px;
}
}`

