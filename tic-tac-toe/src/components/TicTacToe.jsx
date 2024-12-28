import useTicTacToe from '../hooks/useTicTacToe';
import './styles.css';

const TicTacToe = () => {
  const { board, handleClick, getStatus, onRest } = useTicTacToe();
  return (
    <div className="game">
      <div className="status">{getStatus()}</div>
      <div className="board">
        {board.map((b, index) => {
          return (
            <div className="cell" onClick={() => handleClick(index)}>
              {b}
            </div>
          );
        })}
      </div>
      <div>
        <button className="rest" onClick={onRest}>
          Rest
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
