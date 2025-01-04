import { useState, useEffect } from 'react';
import './App.css';

const config = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];

const Cell = ({ index, onCellClick, filled, isDeactivating }) => {
  return (
    <button
      className={filled ? 'cell cell-activated' : 'cell'}
      onClick={() => onCellClick(index)}
      disabled={isDeactivating}
    ></button>
  );
};

function App() {
  const [activatedCells, setActivatedCells] = useState([]);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const onCellClick = (index) => {
    setActivatedCells([...activatedCells, index]);
  };

  const deactivateCells = () => {
    setIsDeactivating(true);
    const timer = setInterval(() => {
      setActivatedCells((cells) => {
        const newCells = [...cells];
        newCells.pop();
        if (newCells.length === 0) {
          clearInterval(timer);
          setIsDeactivating(false);
        }
        return newCells;
      });
    }, 300);
  };

  useEffect(() => {
    if (
      activatedCells.length ===
      config.flat().filter((cell) => cell === 1).length
    ) {
      deactivateCells();
    }
  }, [activatedCells]);
  return (
    <div className="wrapper">
      <h1>Grid Light</h1>
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${config[0].length}, 1fr)` }}
      >
        {config.flat().map((value, index) => {
          return value ? (
            <Cell
              key={index}
              index={index}
              onCellClick={onCellClick}
              filled={activatedCells.includes(index)}
              isdISabled={activatedCells.includes(index) || isDeactivating}
            />
          ) : (
            <span />
          );
        })}
      </div>
    </div>
  );
}

export default App;
