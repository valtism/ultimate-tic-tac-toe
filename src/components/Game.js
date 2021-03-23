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
        "h-full relative grid grid-cols-3 rounded gap-2",
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
        "relative grid grid-cols-3 rounded gap-1",
        allowedBoard === boardIndex && "ring-8 ring-yellow-300 ring-opacity-50"
      )}
    >
      {Array(9)
        .fill()
        .map((_, cellIndex) => {
          const cellId = getCellId(boardIndex, cellIndex);
          const iconType = cellIconType(turns, cellId);
          return (
            <Cell
              key={cellIndex}
              onClick={() => cellClick(cellId)}
              style={{ filter: boardWinner && "blur(2px)" }}
              className={clsx(
                boardWinner === "X" && "bg-red-300",
                boardWinner === "O" && "bg-blue-300"
              )}
            >
              <Icon
                type={iconType}
                className="absolute w-10/12 h-10/12 text-gray-900"
              />
            </Cell>
          );
        })}
      {/* {boardWinner && (
        <Icon
          type={boardWinner}
          className="absolute w-full h-full rounded text-gray-900 bg-gray-900 bg-opacity-30"
        />
      )} */}
    </div>
  );
}

function Cell({ children, className, ...props }) {
  return (
    <div
      className={clsx(
        "relative flex items-center justify-center rounded w-full h-full bg-gray-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
