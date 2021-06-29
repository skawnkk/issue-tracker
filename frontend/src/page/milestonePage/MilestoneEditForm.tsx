import React, { useMemo, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { milestoneTrigger } from 'store/labelMilestoneStore';
import Title from 'components/atom/Title';
import PrimaryButton from 'components/atom/PrimaryButton';
import PrimaryOutlinedButton from 'components/atom/PrimaryOutlinedButton';
import { MilestoneType } from 'components/common/tabModal/tapDataType';
import { fetchCreateMilestone, editMilestone } from 'util/api/fetchHandleMilestone';

import useInput from 'hooks/useInput';
import InputField from 'components/atom/InputField';
interface EditType {
	type?: string;
	milestone?: MilestoneType;
	setEditMode?: Dispatch<SetStateAction<boolean>>;
}
function MilestoneEditForm({ type = 'create', setEditMode, milestone }: EditType) {
	const setMilestoneTrigger = useSetRecoilState(milestoneTrigger);

	const title = useInput(milestone?.title || '');
	const date = useInput(milestone?.dueDate || '');
	const description = useInput(milestone?.description || '');
	const milestoneID = milestone?.id || 0;

	const handleSubmit = () => {
		const newMilestone = {
			title: title.value,
			date: date.value,
			dscription: description.value
		};

		if (type === 'create') fetchCreateMilestone(newMilestone);
		else editMilestone(milestoneID, newMilestone);

		if (setEditMode) setEditMode(false);
		setMilestoneTrigger((trigger) => trigger + 1);
	};

	const handleClick = () => setEditMode && setEditMode(false);

	const pageTitle = useMemo(() => (type === 'create' ? '새로운 마일스톤 추가' : '마일스톤 편집'), []);

	return (
		<MilestoneEditBlock type={type}>
			<Title className='milestone__add'>{pageTitle}</Title>
			<MilestoneInputBlock>
				<div>
					<InputField label={'제목'} {...title} />
					<InputField label={'완료일(선택)'} {...date} />
				</div>
				<InputField label={'설명(선택)'} {...description} />
			</MilestoneInputBlock>
			<div className='milestone__add__submit'>
				{type !== 'create' && <PrimaryOutlinedButton value={'× 취소'} onClick={handleClick} />}
				<PrimaryButton value={'+ 완료'} onClick={handleSubmit} />
			</div>
		</MilestoneEditBlock>
	);
}

export default React.memo(MilestoneEditForm);
interface style {
	type: string;
}
const MilestoneEditBlock = styled.div<style>`
	padding: 2rem;
	border: none;
	border-top: 1px solid ${({ theme }) => theme.color.lineGrey};
	border-radius: 0px;
	${({ type, theme }) =>
		type === 'create' &&
		`margin-bottom: 1.5rem; border-radius: 16px;
		border: 1px solid ${theme.color.lineGrey};`};
	.milestone__add__submit {
		display: flex;
		justify-content: flex-end;
	}
`;

const MilestoneInputBlock = styled.div`
	& > div {
		margin-bottom: 1rem;
		align-items: center;
	}
	& > div:first-child {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 10px;
	}
`;
