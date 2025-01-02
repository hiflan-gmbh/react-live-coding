/* eslint-disable react/prop-types */
import { useState } from 'react';

const Comment = ({ comment, onReply, onEdit, onDelete }) => {
  const [replyContent, setReplyContent] = useState('');
  const [expand, setExpand] = useState(false);

  const toggleExpand = () => {
    setExpand(!expand);
  };

  const onReplySubmit = () => {
    if (replyContent) {
      onReply(comment.id, replyContent);
      setReplyContent('');
    }
  };
  const onEditSubmit = () => {
    onEdit();
  };
  const onDeleteSubmit = () => {
    onDelete();
  };

  return (
    <div className="comment">
      <div className="comment-content">{comment.content}</div>
      <div className="comment-info">Votes : {comment.votes}</div>
      <div className="comment-info">
        {new Date(comment.timestamp).toLocaleString()}
      </div>
      <div className="comment-actions">
        <button className="comment-button" onClick={toggleExpand}>
          {expand ? 'Hide Replies' : 'Reply'}
        </button>
        <button className="comment-button" onClick={onEditSubmit}>
          Edit
        </button>
        <button className="comment-button" onClick={onDeleteSubmit}>
          Delete
        </button>
      </div>
      {expand && (
        <div className="comment-replies">
          <div className="add-comment">
            <textarea
              cols={50}
              rows={3}
              placeholder="Reply to this comment..."
              className="comment-textarea"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
            />
            <button className="comment-button" onClick={onReplySubmit}>
              Reply
            </button>
          </div>
          {comment.replies.map((reply) => {
            return (
              <Comment
                key={reply.id}
                comment={reply}
                onReply={onReply}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Comment;
