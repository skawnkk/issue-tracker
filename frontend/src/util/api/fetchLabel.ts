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
    const response = await fetch(API.labelURL, { headers: authorizedHeaders(token) });
    const labelData = await response.json();
    return labelData;
  } catch (error) {
    throw error;
  }
};

// 라벨 생성

export interface newLabelDataType {
  name: string;
  description: string;
  color: {
    backgroundColorCode: string;
    textColorCode: string;
  };
}

export const createLabel = async (newLabelData: newLabelDataType) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(API.labelURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authorizedHeaders(token) },
      body: JSON.stringify(newLabelData),
    });
    if (response.status === 200) return true;
    else throw Error('잘못된 생성입니다.');
  } catch (error) {
    throw error;
  }
};
