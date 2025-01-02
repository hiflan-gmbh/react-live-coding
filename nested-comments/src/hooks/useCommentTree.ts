import { useState } from 'react';

const useCommentTree = (initialComments) => {
  const [comments, setComments] = useState(initialComments);

  const insertNode = (node, commentId, content) => {
    return node.map((item) => {
      if (item.id === commentId) {
        return {
          ...item,
          replies: [...item.replies, content],
        };
      } else if (item.replies && item.replies.length > 0) {
        return {
          ...item,
          replies: insertNode(item.replies, commentId, content),
        };
      }
      return item;
    });
  };

  const insertComment = (commentId, content) => {
    const newComment = {
      id: new Date().getTime(),
      content,
      votes: 0,
      timestamp: new Date().getTime(),
      replies: [],
    };
    if (commentId) {
      setComments((prevComments) =>
        insertNode(prevComments, commentId, newComment)
      );
    } else {
      setComments((prevComments) => [...prevComments, newComment]);
    }
  };
  return {
    comments,
    insertComment,
  };
};

export default useCommentTree;
