export function isValidClick(pointer, turns, cellId, allowedBoard) {
  // Is current move
  if (pointer !== turns.length) {
    return false;
  }

  // Cell already filled
  if (turns.includes(cellId)) {
    return false;
  }

  // Invalid board
  const boardClick = Number(cellId[0]);
  if (![true, boardClick].includes(allowedBoard)) {
    return false;
  }

  // Board has a winner
  if (!!getBoardWinner(turns, boardClick)) {
    return false;
  }

  // A player has won
  if (getWinner(turns)) {
    return false;
  }

  return true;
}

export function getAllowedBoard(turns) {
  if (!turns.length) {
    return true;
  }
  const lastTurn = turns[turns.length - 1];
  const targetBoard = Number(lastTurn[2]);
  if (!!getBoardWinner(turns, targetBoard)) {
    return true;
  }
  return targetBoard;
}

export function getWinner(turns) {
  const boardWinners = Array(9)
    .fill()
    .map((_, boardIndex) => getBoardWinner(turns, boardIndex));
  return calculateWinner(boardWinners);
}

export function getBoardWinner(turns, boardIndex) {
  const cells = getBoardCells(turns, boardIndex);
  return calculateWinner(cells);
}

function getBoardCells(turns, boardIndex) {
  return Array(9)
    .fill()
    .map((_, cellIndex) => {
      const cellId = getCellId(boardIndex, cellIndex);
      const idx = turns.indexOf(cellId);
      if (idx === -1) {
        return null;
      }
      return idx % 2 === 0 ? "X" : "O";
    });
}

function calculateWinner(cells) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return null;
}

export function cellIconType(turns, cellId) {
  const turnIdx = turns.indexOf(cellId);
  if (turnIdx === -1) {
    return null;
  }

  return turnIdx % 2 === 0 ? "X" : "O";
}

export function getCellId(boardIndex, cellIndex) {
  return `${boardIndex},${cellIndex}`;
}
