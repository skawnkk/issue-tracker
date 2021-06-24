import React, { useState } from 'react'
import { MilestoneType } from 'components/common/tabModal/tapDataType'
import MilestoneAdd from'page/milestonePage/MilestoneAdd'
import MilestoneInfo from 'page/milestonePage/MilestoneInfo'
interface MilestoneItemType{
  milestone: MilestoneType
}
export default function MilestoneItem({milestone}:MilestoneItemType){
  const [isEditMode, setEditMode] = useState(false)
  return !isEditMode?<MilestoneInfo setEditMode={setEditMode} milestone={milestone}/>:<MilestoneAdd type='edit' setEditMode={setEditMode} milestone={milestone}/>
}

