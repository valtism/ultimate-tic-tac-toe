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
  const p1Turn = turns.length % 2 === 0;
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
    <div className="flex flex-col items-center justify-center space-y-2">
      <h1 className="text-xl font-medium mt-4">Ultimate Tic-Tac-Toe</h1>
      <GameBox
        gameRef={gameRef}
        turnsSlice={turnsSlice}
        cellClick={cellClick}
        allowedBoard={allowedBoard}
      />
      <PlayerTurn winner={winner} p1Turn={p1Turn} />
    </div>
  );
}

function GameBox({ gameRef, turnsSlice, cellClick, allowedBoard }) {
  return (
    <ResizableBox
      height={300}
      width={300}
      minConstraints={[200, 200]}
      lockAspectRatio
      draggableOpts={{
        nodeRef: gameRef,
      }}
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
  );
}

function PlayerTurn({ p1Turn }) {
  return (
    <div className="flex flex-col items-center space-y-1">
      <span className="text-sm font-bold tracking-wider text-gray-700 uppercase">
        Current turn
      </span>
      <div className="flex items-center justify-center rounded w-8 h-8 bg-gray-300">
        <Icon className="w-1/2 h-1/2 text-gray-900" type={p1Turn ? "X" : "O"} />
      </div>
    </div>
  );
}

function WinnerAnnouncement({ winner }) {
  if (!winner) {
    return null;
  }

  return (
    <span className="font-medium text-gray-900">{`Player ${
      winner === "X" ? "1" : "2"
    } Wins!`}</span>
  );
}

export default App;
