import { selector } from 'recoil';
import { fetchGetLabelData, LabelDataType } from 'util/api/fetchLabel';

export const getLabelData = selector<LabelDataType>({
  key: 'GET/labelData',
  get: async ({ get }) => {
    //트리거 추가
    const labelData = await fetchGetLabelData();
    return labelData;
  },
});
