import { useState } from 'react';
import Comment from './Comment';
import useCommentTree from '../hooks/useCommentTree';
import './styles.css';

const NestedComments = ({ comments = [] }) => {
  const { comments: commentData, insertComment } = useCommentTree(comments);
  const [comment, setComment] = useState('');

  const onComment = (commentId, content) => {
    insertComment(commentId, content);
    setComment('');
  };
  const onChange = (e) => {
    setComment(e.target.value);
  };

  const onCommentSubmit = () => {
    if (comment) {
      onComment(undefined, comment);
      setComment('');
    }
  };

  return (
    <>
      <div className="add-comment">
        <textarea
          value={comment}
          onChange={onChange}
          rows={3}
          cols={50}
          className="comment-textarea"
          placeholder="Add a new comment..."
        />
        <button onClick={onCommentSubmit} className="comment-button">
          Add Comment
        </button>
      </div>
      {commentData.map((comment) => {
        return (
          <Comment
            key={comment.id}
            comment={comment}
            onReply={onComment}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        );
      })}
    </>
  );
};

export default NestedComments;
