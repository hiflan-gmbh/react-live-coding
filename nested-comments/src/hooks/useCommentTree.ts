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
  const editNode = (nodes, commentId, content) => {
    return nodes.map((node) => {
      if (node.id === commentId) {
        console.log('editNode', node.id, commentId, content);
        return {
          ...node,
          content,
          timestamp: new Date().toISOString(),
        };
      } else if (node.replies && node.replies.length > 0) {
        return {
          ...node,
          replies: editNode(node.replies, commentId, content),
        };
      }
      return node;
    });
  };

  const editComment = (commentId, content) => {
    setComments((prevComments) => editNode(prevComments, commentId, content));
  };

  const deleteNode = (nodes, commentId) => {
    return nodes.reduce((acc, node) => {
      if (node.id === commentId) {
        return acc;
      } else if (node.replies && node.replies.length > 0) {
        node.replies = deleteNode(node.replies, commentId);
      }
      return [...acc, node];
    }, []);
  };

  const deleteComment = (commentId) => {
    setComments((prevComments) => deleteNode(prevComments, commentId));
  };
  return {
    comments,
    insertComment,
    editComment,
    deleteComment,
  };
};

export default useCommentTree;
