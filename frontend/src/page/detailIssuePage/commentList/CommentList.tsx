import React, { useRef } from 'react';
import styled from 'styled-components';
import { CommentType } from 'components/common/tabModal/tapDataType';
import Comment from 'page/detailIssuePage/commentList/Comment';
import CommentInput from './CommentInput';
import PrimaryButton from 'components/atom/PrimaryButton';
import { editComments } from 'util/api/fetchIssueDetail';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { detailIssueTrigger } from 'store/detailStore';

interface Props {
  issueId: number;
  comments: Array<CommentType> | [];
}
//유저 avatar 필요
export default function CommentList({ issueId, comments }: Props) {
  const [comment, setComment] = useState('');
  const setDetailIssueTrigger = useSetRecoilState(detailIssueTrigger);

  const handleCreateCommentClick = () => {
    if (!comment) return;
    editComments(issueId, comment);
    setComment('');
    setDetailIssueTrigger((triggerCount) => triggerCount + 1);
  };
  const commentList = comments.map((comment) => (
    <Comment key={comment.id} {...{ issueId, comment }} />
  ));
  return (
    <CommentListBlock>
      {commentList}
      <CommentInput {...{ comment, setComment }} />
      <div className='comment__create-btn'>
        <PrimaryButton value='+ 코멘트 작성' onClick={handleCreateCommentClick} />
      </div>
    </CommentListBlock>
  );
}

const CommentListBlock = styled.div`
  margin-right: 4rem;
  min-width: 550px;
  .comment__create-btn {
    display: flex;
    justify-content: flex-end;
  }
`;
