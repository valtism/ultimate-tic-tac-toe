import { useRef, useState } from "react";
import "react-resizable/css/styles.css";

import { Game } from "./Game";
import { usePointerKeys as useViewTurnKeys } from "../hooks/usePointerKeys";
import { Icon } from "./Icon";
import {
  getAllowedBoard,
  getWinner,
  isValidClick,
} from "../functions/gameFunctions";
import { ResizableBox } from "react-resizable";

function App() {
  // Game State
  const [turns, setTurns] = useState([]);
  const [viewTurn, setViewTurn] = useState(0);

  // Derived Game State
  const turnsSlice = turns.slice(0, viewTurn);
  const p1Turn = turnsSlice.length % 2 === 0;
  const allowedBoard = getAllowedBoard(turnsSlice);
  const winner = getWinner(turnsSlice);

  function cellClick(cellId) {
    if (isValidClick(viewTurn, turns, cellId, allowedBoard)) {
      const newTurns = turns.concat(cellId);
      setTurns(newTurns);
      setViewTurn(newTurns.length);
    }
  }

  useViewTurnKeys(turns, setViewTurn);

  // Use this to avoid strictMode warning when using ResizableBox
  const gameRef = useRef(null);

  return (
    <div className="flex justify-center mt-4">
      <ResizableBox
        height={300}
        width={300}
        minConstraints={[200, 200]}
        lockAspectRatio
        draggableOpts={{ nodeRef: gameRef }}
        className="p-2"
      >
        <div ref={gameRef} className="w-full h-full">
          <Game
            turns={turnsSlice}
            cellClick={cellClick}
            allowedBoard={allowedBoard}
          />
        </div>
      </ResizableBox>
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
