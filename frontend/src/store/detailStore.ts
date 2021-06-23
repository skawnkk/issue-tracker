import { atom, selector } from 'recoil';
import fetchIssueDetail from 'util/api/fetchIssueDetail';

export const detailIdState = atom({
  key: 'detailIssueId',
  default: 0,
});

export const getDetailIssueData = selector({
  key: 'GET/DetailIssueData',
  get: async ({ get }) => {
    const id = get(detailIdState);
    if (!id) return;
    const detailData = await fetchIssueDetail(id);
    return detailData;
  },
});
