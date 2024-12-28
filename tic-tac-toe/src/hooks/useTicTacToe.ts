import { useState } from 'react';

const initBoard = () => Array(9).fill(null);
const useTicTacToe = () => {
  const [board, setBoard] = useState(initBoard());
  const [isXNext, setIsXNext] = useState(true);

  const WINNING_PATTERNS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const getWinner = () => {
    for (let i = 0; i < WINNING_PATTERNS.length; i++) {
      const [a, b, c] = WINNING_PATTERNS[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    const winner = getWinner();
    if (winner || board[index]) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const getStatus = () => {
    const winner = getWinner();
    if (winner) return `Player ${winner} wins!`;
    if (!board.includes(null)) return `It's a draw!`;
    return `Player ${isXNext ? 'X' : 'O'}'s trun`;
  };

  const onRest = () => {
    setBoard(initBoard());
    setIsXNext(true);
  };

  return {
    board,
    handleClick,
    getStatus,
    onRest,
  };
};

export default useTicTacToe;
