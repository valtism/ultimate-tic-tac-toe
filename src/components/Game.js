import clsx from "clsx";

import { useDarkContext } from "../hooks/useDarkContext";
import {
  cellIconType,
  getBoardWinner,
  getCellId,
} from "../functions/gameFunctions";
import { Icon } from "./Icon";

export function Game({ turns, cellClick, allowedBoard }) {
  return (
    <div
      style={{ gap: "4%" }}
      className="h-full relative grid grid-cols-3 rounded"
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
  const dark = useDarkContext();
  const boardWinner = getBoardWinner(turns, boardIndex);
  const isValidBoard =
    !boardWinner && [true, boardIndex].includes(allowedBoard);
  const invalidFilter = dark
    ? "blur(1px) contrast(130%) grayscale(40%)"
    : "blur(1px) contrast(80%) grayscale(30%)";

  return (
    <div
      style={{
        gap: "4%",
        filter: !isValidBoard && invalidFilter,
      }}
      className="grid grid-cols-3 rounded"
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
              isValid={isValidBoard}
              className={clsx(
                boardWinner === "X" &&
                  "bg-red-300 bg-opacity-70 dark:bg-red-600 dark:bg-opacity-30",
                boardWinner === "O" &&
                  "bg-blue-300 bg-opacity-70 dark:bg-blue-600 dark:bg-opacity-30"
              )}
            >
              <Icon
                type={iconType}
                className={`animate-${iconType} absolute w-1/2 h-1/2 text-gray-900`}
              />
            </Cell>
          );
        })}
    </div>
  );
}

function Cell({ isValid, className, children, ...props }) {
  return (
    <div
      className={clsx(
        "relative flex items-center justify-center rounded w-full h-full bg-gray-200 dark:bg-gray-700 m-px",
        isValid && "cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
