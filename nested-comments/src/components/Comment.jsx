/* eslint-disable react/prop-types */
import { useState } from 'react';

const Comment = ({ comment, onReply, onEdit, onDelete }) => {
  const [expand, setExpand] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [editContent, setEditContent] = useState(comment.content);
  const [editMode, setEditMode] = useState(false);

  const toggleExpand = () => {
    setExpand(!expand);
  };
  const toggleEditMode = () => {
    setEditMode(!editMode);
    setEditContent(comment.content);
  };
  const handleChange = (e) => {
    if (editMode) {
      setEditContent(e.target.value);
    } else {
      setReplyContent(e.target.value);
    }
  };
  const onReplySubmit = () => {
    if (replyContent) {
      onReply(comment.id, replyContent);
      setReplyContent('');
    }
  };
  const onEditSubmit = () => {
    onEdit(comment.id, editContent);
    setEditMode(false);
  };
  const onDeleteSubmit = () => {
    onDelete(comment.id);
  };

  return (
    <div className="comment">
      {!editMode ? (
        <>
          <p className="comment-content">{comment.content}</p>
          <p className="comment-info">Votes : {comment.votes}</p>
          <p className="comment-info">
            {new Date(comment.timestamp).toLocaleString()}
          </p>
        </>
      ) : (
        <div className="add-comment">
          <textarea
            cols={50}
            rows={3}
            value={editContent}
            className="comment-textarea"
            onChange={handleChange}
          />
          <button className="comment-button" onClick={onEditSubmit}>
            Save Edit
          </button>
          <button className="comment-button" onClick={toggleEditMode}>
            Cancel Edit
          </button>
        </div>
      )}
      <div className="comment-actions">
        <button className="comment-button" onClick={toggleExpand}>
          {expand ? 'Hide Replies' : 'Reply'}
        </button>
        <button className="comment-button" onClick={toggleEditMode}>
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
              onChange={handleChange}
            />
            <button className="comment-button" onClick={onReplySubmit}>
              Reply
            </button>
          </div>
          {comment?.replies?.map((reply) => {
            return (
              <Comment
                key={reply.id}
                comment={reply}
                onReply={onReply}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Comment;
