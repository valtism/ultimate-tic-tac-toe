import { useReducer } from "react";
import { ReactComponent as X } from "./X.svg";
import { ReactComponent as O } from "./O.svg";

const initialState = {
  p1Turn: true,
  availableBoard: true,
  cells: generateCells(),
  winner: null,
};

function generateCells() {
  const cells = {};
  for (let i = 0; i <= 9; i++) {
    for (let j = 0; j <= 9; j++) {
      cells[`${i},${j}`] = null;
    }
  }
  return cells;
}

function reducer(state, action) {
  switch (action.type) {
    case "click":
      const { cells, availableBoard, p1Turn } = state;
      const { boardIndex, cellIndex } = action;
      const cellId = `${action.boardIndex},${action.cellIndex}`;

      const newCells = {
        ...cells,
        [cellId]: p1Turn ? "O" : "X",
      };

      const boardWinners = Array(9)
        .fill()
        .map((_, i) => getBoardWinner(i, cells));

      const newWinner = calculateWinner(boardWinners);

      if (!isValidClick(newWinner, cellId, boardIndex, cells, availableBoard)) {
        return state;
      }

      return {
        p1Turn: !p1Turn,
        availableBoard: getAvailableBoard(newWinner, boardIndex, cellIndex, newCells),
        cells: newCells,
        winner: newWinner,
      };
    default:
      throw new Error();
  }
}

function isValidClick(winner, cellId, boardIndex, cells, availableBoard) {
  if (winner) {
    return false;
  }

  const isAllowedBoard = [true, boardIndex].includes(availableBoard);
  if (!isAllowedBoard) {
    return false;
  }

  const isPopulated = !!cells[cellId];
  if (isPopulated) {
    return false;
  }

  return true;
}

function getAvailableBoard(winner, boardIndex, cellIndex, cells) {
  if (winner) {
    return false;
  }

  if (isCompleted(boardIndex, cells)) {
    return true;
  }

  return cellIndex;
}

function isCompleted(boardIndex, cells) {
  const boardCells = getBoardCells(boardIndex, cells);

  const fullBoard = boardCells.every((cell) => cell !== null);
  if (fullBoard) {
    return true;
  }

  const hasWinner = !!calculateWinner(boardCells);
  return hasWinner;
}

function getBoardWinner(boardIndex, cells) {
  const boardCells = getBoardCells(boardIndex, cells);
  return calculateWinner(boardCells);
}

function getBoardCells(boardIndex, cells) {
  return Array(9)
    .fill()
    .map((_, i) => cells[`${boardIndex},${i}`]);
}

function calculateWinner(cells) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return null;
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  const { cells, availableBoard, p1Turn } = state;

  const boardWinners = Array(9)
    .fill()
    .map((_, i) => getBoardWinner(i, cells));
  const winner = calculateWinner(boardWinners);

  return (
    <div className="flex justify-center mt-4">
      <Game availableBoard={availableBoard} cells={cells} dispatch={dispatch} />
      <div className="w-32 ml-4 flex flex-col items-center">
        {winner ? (
          <span className="font-medium text-gray-900">{`Player ${
            winner === "O" ? "1" : "2"
          } Wins!`}</span>
        ) : (
          <>
            <span className="font-medium text-gray-900">{`Player ${
              p1Turn ? "1" : "2"
            }`}</span>
            <div className="flex items-center justify-center rounded w-8 h-8 m-2 bg-gray-300">
              <Icon
                className="w-6 h-6 text-gray-900"
                type={p1Turn ? "O" : "X"}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Game({ availableBoard, cells, dispatch }) {
  return (
    <div
      className={`relative inline-grid grid-cols-3 rounded gap-2 ${
        availableBoard === true ? "ring-8 ring-yellow-300 ring-opacity-50" : ""
      }`}
    >
      {Array(9)
        .fill()
        .map((_, boardIndex) => (
          <Board
            key={boardIndex}
            boardIndex={boardIndex}
            cells={cells}
            isAvailable={availableBoard === boardIndex}
            dispatch={dispatch}
          />
        ))}
    </div>
  );
}

function Board({ boardIndex, cells, isAvailable, dispatch }) {
  const boardWinner = getBoardWinner(boardIndex, cells);
  return (
    <div
      className={`relative inline-grid grid-cols-3 rounded gap-1 ${
        isAvailable ? "ring-8 ring-yellow-300 ring-opacity-50" : ""
      }`}
    >
      {Array(9)
        .fill()
        .map((_, cellIndex) => (
          <Cell
            key={cellIndex}
            cell={cells[`${boardIndex},${cellIndex}`]}
            onClick={() =>
              dispatch({
                type: "click",
                boardIndex: boardIndex,
                cellIndex: cellIndex,
              })
            }
          />
        ))}
      {boardWinner && (
        <Icon
          type={boardWinner}
          className="absolute w-full h-full rounded text-gray-900 bg-gray-900 bg-opacity-30"
        />
      )}
    </div>
  );
}

function Cell({ cell, onClick }) {
  return (
    <div
      className="flex items-center justify-center rounded w-8 h-8 bg-gray-200"
      onClick={onClick}
    >
      <Icon type={cell} className="w-6 h-6 text-gray-900" />
    </div>
  );
}

function Icon({ type, ...props }) {
  switch (type) {
    case "O":
      return <O {...props} />;
    case "X":
      return <X {...props} />;
    default:
      return <div />;
  }
}

export default App;
