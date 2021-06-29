import React from 'react';
import styled from 'styled-components';
import { getMilestones } from 'store/labelMilestoneStore';
import { useRecoilValue } from 'recoil';
import MilestoneIcon from 'components/atom/MilestoneIcon';
import { ReactComponent as CloseIcon } from 'assets/icon/CloseIcon.svg';
import MilestoneItem from 'page/milestonePage/milestoneTable/MilestoneItem';
import { MilestoneType } from 'components/common/tabModal/tapDataType';

function MilestoneTable() {
	const status = 'open';
	const { closedMilestonesCount, openedMilestonesCount, milestones } = useRecoilValue(getMilestones(status));
	const milestoneList = milestones.map((milestone: MilestoneType) => (
		<MilestoneItem key={milestone.id} milestone={milestone} />
	));

	return (
		<MilestoneTableBlock>
			<div className='tab__table__header'>
				<div>
					<div>
						<MilestoneIcon />
						열린 마일스톤({openedMilestonesCount})
					</div>
					<div>
						<CloseIcon />
						&nbsp;&nbsp;닫힌 마일스톤({closedMilestonesCount})
					</div>
				</div>
			</div>
			{milestoneList}
		</MilestoneTableBlock>
	);
}
export default React.memo(MilestoneTable);

const MilestoneTableBlock = styled.div`
	border-radius: 16px;
	border: 1px solid ${({ theme }) => theme.color.lineGrey};
	.tab__table__header {
		position: relative;
		display: flex;
		justify-content: space-between;
		padding: 10px;
		background-color: ${({ theme }) => theme.color.bgGrey};
		border-radius: 16px 16px 0 0;
		div {
			display: flex;
			width: 300px;
			div {
				display: flex;
				align-items: center;
			}
		}
	}
`;
