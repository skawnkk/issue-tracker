import { LabelType } from 'components/common/tabModal/tapDataType';
import API, { authorizedHeaders } from './api';

//라벨 전체 데이터 조회

export interface LabelDataType {
  labelsCount: number;
  milestonesCount: number;
  labels: Array<LabelType>;
}

export const fetchGetLabelData = async (): Promise<LabelDataType> => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(API.getLabelData, { headers: authorizedHeaders(token) });
    const labelData = await response.json();
    return labelData;
  } catch (error) {
    throw error;
  }
};
