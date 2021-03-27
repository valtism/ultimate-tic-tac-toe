import { useRef, useState } from "react";
import "react-resizable/css/styles.css";
import { ResizableBox } from "react-resizable";

import { Game } from "./Game";
import { Icon } from "./Icon";
import { DarkContext } from "../context/DarkContext";
import { useViewTurnKeys } from "../hooks/useViewTurnKeys";
import { useDarkMode } from "../hooks/useDarkMode";
import {
  getAllowedBoard,
  getWinner,
  isValidClick,
} from "../functions/gameFunctions";

export default function App() {
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
  const [dark, setDark] = useDarkMode();

  return (
    <DarkContext.Provider value={dark}>
      <div className="bg-white dark:bg-gray-900 flex flex-col items-center space-y-2">
        <h1 className="font-display text-xl mt-4 text-gray-900 dark:text-white">
          Ultimate Tic-Tac-Toe
        </h1>
        <div className="absolute top-2 right-4">
          <DarkToggle dark={dark} setDark={setDark} />
        </div>
        <GameBox>
          <Game
            turns={turnsSlice}
            cellClick={cellClick}
            allowedBoard={allowedBoard}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <WinnerAnnouncement winner={winner} />
          </div>
        </GameBox>
        <CurrentTurn winner={winner} p1Turn={p1Turn} />
      </div>
    </DarkContext.Provider>
  );
}

function GameBox({ children }) {
  // Use this to avoid strictMode warning when using ResizableBox
  const gameRef = useRef(null);

  // Disable resizable box for mobile. Unneeded and had a bug preventing cell clicks
  const isMobile = Boolean(
    navigator.userAgent.match(/Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i)
  );

  return (
    <>
      {isMobile ? (
        <div style={{ width: "90vw", height: "90vw" }}>{children}</div>
      ) : (
        <ResizableBox
          height={300}
          width={300}
          minConstraints={[200, 200]}
          lockAspectRatio
          draggableOpts={{
            nodeRef: gameRef,
          }}
          onResizeStart={() => console.log("hurr")}
          className="flex items-center justify-center relative p-2"
        >
          <div ref={gameRef} className="w-full h-full">
            {children}
          </div>
        </ResizableBox>
      )}
    </>
  );
}

function CurrentTurn({ p1Turn }) {
  return (
    <div className="flex flex-col items-center space-y-1">
      <span className="text-sm font-bold tracking-wider text-gray-700 dark:text-gray-100 uppercase">
        Current turn
      </span>
      <div className="flex items-center justify-center rounded w-8 h-8 bg-gray-200 dark:bg-gray-700">
        <Icon className="w-1/2 h-1/2" type={p1Turn ? "X" : "O"} />
      </div>
    </div>
  );
}

function WinnerAnnouncement({ winner }) {
  if (!winner) {
    return null;
  }

  return (
    <div className="bg-gray-900 dark:bg-gray-200 px-4 py-2 rounded shadow-lg">
      <span className="font-medium text-white dark:text-gray-900">{`Player ${
        winner === "X" ? "1" : "2"
      } Wins!`}</span>
    </div>
  );
}

function DarkToggle({ dark, setDark }) {
  return (
    <div>
      <button className="w-6 h-6" onClick={() => setDark(!dark)}>
        <span>{dark ? "☀️" : "🌙"}</span>
      </button>
    </div>
  );
}
