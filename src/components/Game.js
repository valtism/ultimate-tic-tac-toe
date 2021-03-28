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
              id={cellId}
              onClick={() => cellClick(cellId)}
              onKeyDown={({ key }) => {
                switch (key) {
                  case "ArrowUp":
                  case "ArrowRight":
                  case "ArrowDown":
                  case "ArrowLeft":
                    return handleGridNavigation(key, cellId);
                  default:
                    return;
                }
              }}
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
    <button
      className={clsx(
        "relative flex items-center justify-center rounded w-full h-full",
        "bg-gray-200 dark:bg-gray-700 m-px",
        "focus:outline-none focus:ring",
        !isValid && "focus:ring-gray-500 focus:ring-opacity-50",
        !isValid && "cursor-default",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function handleGridNavigation(key, cellId) {
  const nextCell = getNavigatedCellId(key, cellId);
  document.getElementById(nextCell).focus();
}

function getNavigatedCellId(key, cellId) {
  const [boardIndex, cellIndex] = cellId.split(",").map(Number);
  switch (key) {
    case "ArrowUp":
      if ([3, 4, 5, 6, 7, 8].includes(cellIndex)) {
        return `${boardIndex},${cellIndex - 3}`;
      } else if ([0, 1, 2].includes(boardIndex)) {
        return cellId;
      } else {
        return `${boardIndex - 3},${cellIndex + 6}`;
      }
    case "ArrowRight":
      if ([0, 1, 3, 4, 6, 7].includes(cellIndex)) {
        return `${boardIndex},${cellIndex + 1}`;
      } else if ([2, 5, 8].includes(boardIndex)) {
        return cellId;
      } else {
        return `${boardIndex + 1},${cellIndex - 2}`;
      }
    case "ArrowDown":
      if ([0, 1, 2, 3, 4, 5].includes(cellIndex)) {
        return `${boardIndex},${cellIndex + 3}`;
      } else if ([6, 7, 8].includes(boardIndex)) {
        return cellId;
      } else {
        return `${boardIndex + 3},${cellIndex - 6}`;
      }
    case "ArrowLeft":
      if ([1, 2, 4, 5, 7, 8].includes(cellIndex)) {
        return `${boardIndex},${cellIndex - 1}`;
      } else if ([0, 3, 6].includes(boardIndex)) {
        return cellId;
      } else {
        return `${boardIndex - 1},${cellIndex + 2}`;
      }
    default:
      return cellId;
  }
}
