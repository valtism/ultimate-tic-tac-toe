import { useState } from "react";

import { Game } from "./Game";
import { usePointerKeys } from "../hooks/usePointerKeys";
import { Icon } from "./Icon";
import {
  getAllowedBoard,
  getWinner,
  isValidClick,
} from "../functions/gameFunctions";

function App() {
  // State
  const [turns, setTurns] = useState([]);
  const [pointer, setPointer] = useState(0);

  // Derived State
  const turnsSlice = turns.slice(0, pointer);
  const p1Turn = turnsSlice.length % 2 === 0;
  const allowedBoard = getAllowedBoard(turnsSlice);
  const winner = getWinner(turnsSlice);

  function cellClick(cellId) {
    if (isValidClick(pointer, turns, cellId, allowedBoard)) {
      const newTurns = turns.concat(cellId);
      setTurns(newTurns);
      setPointer(newTurns.length);
    }
  }

  usePointerKeys(turns, setPointer);

  return (
    <div className="flex justify-center mt-4">
      <Game
        turns={turnsSlice}
        cellClick={cellClick}
        allowedBoard={allowedBoard}
      />
      <Sidebar winner={winner} p1Turn={p1Turn} />
    </div>
  );
}

function Sidebar({ winner, p1Turn }) {
  return (
    <div className="w-32 ml-4 flex flex-col items-center">
      {winner ? (
        <span className="font-medium text-gray-900">{`Player ${
          winner === "X" ? "1" : "2"
        } Wins!`}</span>
      ) : (
        <>
          <span className="font-medium text-gray-900">{`Player ${
            p1Turn ? "1" : "2"
          }`}</span>
          <div className="flex items-center justify-center rounded w-8 h-8 m-2 bg-gray-300">
            <Icon className="w-6 h-6 text-gray-900" type={p1Turn ? "X" : "O"} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
