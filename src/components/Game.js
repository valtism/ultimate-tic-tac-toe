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
  const boardWinner = getBoardWinner(turns, boardIndex);
  const isValidBoard =
    !boardWinner && [true, boardIndex].includes(allowedBoard);

  return (
    <div
      style={{
        gap: "4%",
        filter: !isValidBoard && "blur(1px) sepia(10%) grayscale(30%)",
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
                boardWinner === "X" && "bg-red-300",
                boardWinner === "O" && "bg-blue-300"
              )}
            >
              <Icon
                type={iconType}
                className="absolute w-1/2 h-1/2 text-gray-900"
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
        "relative flex items-center justify-center rounded w-full h-full bg-gray-200 m-px",
        isValid && "cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
