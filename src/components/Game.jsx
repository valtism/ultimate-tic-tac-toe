import React from "react";
import clsx from "clsx";

import { useDarkContext } from "../hooks/useDarkContext";
import {
  cellIconType,
  getBoardWinner,
  getCellId,
} from "../functions/gameFunctions";
import { Icon } from "./Icon";
import { Cell } from "./Cell";

export function Game({ turns, cellClick, allowedBoard }) {
  return (
    <div className="h-full relative grid grid-cols-3 rounded gap-[4%]">
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
      className={clsx(
        "grid grid-cols-3 rounded gap-[4%]",
        !isValidBoard &&
          "filter blur-[1px] contrast-75 dark:contrast-125 grayscale-[30%] dark:grayscale-[40%]"
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
              disabled={!isValidBoard}
              className={clsx(
                boardWinner === "X" &&
                  "from-red-300 to-red-200 dark:from-red-600 dark:to-red-300",
                boardWinner === "O" &&
                  "from-blue-300 to-blue-200 dark:bg-blue-600 dark:bg-opacity-30"
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
