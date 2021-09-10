import React, { useState } from 'react';
import { MilestoneType } from 'components/common/tabModal/tapDataType';
import MilestoneEditForm from 'components/milestonePage/MilestoneEditForm';
import MilestoneInfo from 'components/milestonePage/milestoneTable/MilestoneInfo';
interface MilestoneItemType {
  milestone: MilestoneType;
}
export default function MilestoneItem({ milestone }: MilestoneItemType) {
  const [isEditMode, setEditMode] = useState(false);
  return !isEditMode ? (
    <MilestoneInfo setEditMode={setEditMode} milestone={milestone} />
  ) : (
    <MilestoneEditForm type='edit' setEditMode={setEditMode} milestone={milestone} />
  );
}
