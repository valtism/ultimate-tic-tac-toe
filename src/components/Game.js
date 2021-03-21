import clsx from "clsx";
import {
  cellIconType,
  getBoardWinner,
  getCellId,
} from "../functions/gameFunctions";
import { Icon } from "./Icon";

export function Game({ turns, cellClick, allowedBoard }) {
  return (
    <div
      className={clsx(
        "relative inline-grid grid-cols-3 rounded gap-2",
        allowedBoard === true && "ring-8 ring-yellow-300 ring-opacity-50"
      )}
    >
      {Array(9)
        .fill()
        .map((_, boardIndex) => (
          <Board
            key={boardIndex}
            turns={turns}
            cellClick={cellClick}
            allowedBoard={allowedBoard}
            boardIndex={boardIndex}
          />
        ))}
    </div>
  );
}

function Board({ turns, cellClick, allowedBoard, boardIndex }) {
  const boardWinner = getBoardWinner(turns, boardIndex);
  return (
    <div
      className={clsx(
        "relative inline-grid grid-cols-3 rounded gap-1",
        allowedBoard === boardIndex && "ring-8 ring-yellow-300 ring-opacity-50"
      )}
    >
      {Array(9)
        .fill()
        .map((_, cellIndex) => {
          const cellId = getCellId(boardIndex, cellIndex);
          const iconType = cellIconType(turns, cellId);
          return (
            <Cell key={cellIndex} onClick={() => cellClick(cellId)}>
              <Icon type={iconType} className="w-6 h-6 text-gray-900" />
            </Cell>
          );
        })}
      {boardWinner && (
        <Icon
          type={boardWinner}
          className="absolute w-full h-full rounded text-gray-900 bg-gray-900 bg-opacity-30"
        />
      )}
    </div>
  );
}

function Cell({ children, ...props }) {
  return (
    <div
      className="flex items-center justify-center rounded w-8 h-8 bg-gray-200"
      {...props}
    >
      {children}
    </div>
  );
}
