import { atom, selector } from 'recoil';
import { LabelType, MilestoneType, UserType } from 'components/common/tabModal/tapDataType';
import API, { authorizedHeaders } from 'util/api/api';
interface countType {
  label: number;
  milestone: number;
  openedIssue: number;
  closedIssue: number;
}

interface LabelColorType {
  backgroundColorCode: string;
  textColorCode: string;
}

interface LabelProp {
  id: number;
  name: string;
  color: LabelColorType;
  description: string;
  checked: boolean;
}

interface IssuesType {
  assignees: string[];
  author: string;
  comment: string;
  commentNumber: number;
  createdDateTime: string;
  id: number;
  labels: LabelProp[];
  milestone: string;
  title: string;
}

interface IssuesInfoStateType {
  issues: IssuesType[];
  count: countType;
}

export const issueTypeState = atom<string>({
  key: 'issueTypeState',
  default: 'open',
});

// interface IssueFilterType {
//   type: string;
//   select: string;
// }

export const isFilterFullSetting = atom<boolean>({
  key: 'isFilterFullSetting',
  default: true,
});

export const issueFilterTypeState = atom<{ key: string; name: string }>({
  key: 'issueFilterTypeState',
  default: { name: '', key: '' },
});

export const issueFilterSelectState = atom<string>({
  key: 'issueFilterSelectState',
  default: '',
});

export const getIssueTrigger = atom<number>({
  key: 'getIssueTrigger',
  default: 0,
});

export const getIssuesInfoState = selector<IssuesInfoStateType | null>({
  key: 'GET/issues',
  get: async ({ get }) => {
    const token = localStorage.getItem('token');

    const trigger = get(getIssueTrigger);
    const issueType = get(issueTypeState);
    const isFilterSetting = get(isFilterFullSetting);
    if (!isFilterSetting) return null;
    try {
      const response = await fetch(API.getIssue + issueType, { headers: authorizedHeaders(token) });
      const issuesData = await response.json();
      const issuesInfoState = { issues: issuesData.issues, count: issuesData.count };
      return issuesInfoState;
    } catch (err) {
      console.log('이슈 리스트 패치');
      throw err;
    }
  },
});

interface TabInfoType {
  assignee: Array<UserType>;
  label: Array<LabelType>;
  milestone: Array<MilestoneType>;
  [key: string]: Array<UserType> | Array<LabelType> | Array<MilestoneType>;
}

export const getTabInfoState = selector<TabInfoType>({
  key: 'GET/tabinfo',
  get: async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(API.tabType, { headers: authorizedHeaders(token) });
      const tabData = await response.json();
      const tabInfos = {
        assignee: tabData.assignees,
        label: tabData.labels,
        milestone: tabData.milestones,
      };
      return tabInfos;
    } catch (err) {
      throw new Error('잘못된 요청입니다.');
    }
  },
});

//create
export const IssueFormDataState = selector({
  key: 'create/issue/form',
  get: ({ get }) => {
    const {
      assignee: selectUser,
      label: selectLabel,
      milestone: selectMilestone,
    } = get(selectedTabState);
    const assigneeID = selectUser.map((user) => user.id);
    const labelID = selectLabel.map((label) => label.id);
    const milestoneID = selectMilestone?.id;
    return { assigneeID, labelID, milestoneID };
  },
});

export interface selectedTabType {
  assignee: Array<UserType> | [];
  label: Array<LabelType> | [];
  milestone: MilestoneType | null;
  [key: string]: [] | Array<UserType> | Array<LabelType> | MilestoneType | null;
}

export const selectedUserState = atom<Array<UserType> | []>({
  key: 'selectedUserTabState',
  default: [],
});

export const selectedLabelState = atom<Array<LabelType> | []>({
  key: 'selectedLabelTabState',
  default: [],
});

export const selectedMilestoneState = atom<MilestoneType | null>({
  key: 'selectedMilestoneTabState',
  default: null,
});

export const selectedTabState = selector<selectedTabType>({
  key: 'selectedTabState',
  get: ({ get }) => {
    const selectUser = get(selectedUserState);
    const selectLabel = get(selectedLabelState);
    const selectMilestone = get(selectedMilestoneState);

    return { assignee: selectUser, label: selectLabel, milestone: selectMilestone };
  },
  set: ({ set }, newValue) => {
    const { assignee, label, milestone } = newValue as selectedTabType;
    set(selectedUserState, assignee);
    set(selectedLabelState, label);
    set(selectedMilestoneState, milestone);
  },
});

export const resetSelectedTab = selector<null>({
  key: 'resetSelectedTab',
  get: () => null,
  set: ({ reset }) => {
    reset(selectedUserState);
    reset(selectedLabelState);
    reset(selectedMilestoneState);
  },
});
