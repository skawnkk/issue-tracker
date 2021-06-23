import { LabelType } from 'components/common/tabModal/tapDataType';
import React from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
  label?: LabelType;
}

export default function LabelEditForm({}: Props) {
  return <LabelEditFormBlock></LabelEditFormBlock>;
}

const LabelEditFormBlock = styled.div``;
