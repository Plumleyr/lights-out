import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for (let i = 0; i < ncols; i++) {
      let row = [];
      for (let j = 0; j < nrows; j++) {
        row.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.every((row) => row.every((cell) => !cell));
  }

  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord;

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      let deepCopy = oldBoard.map((row) => [...row]);

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, deepCopy);
      flipCell(y, x - 1, deepCopy);
      flipCell(y, x + 1, deepCopy);
      flipCell(y - 1, x, deepCopy);
      flipCell(y + 1, x, deepCopy);
      // TODO: return the copy
      return deepCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  if (hasWon()) {
    return <div>You Win!</div>;
  }

  // make table board
  return (
    <div>
      <table>
        <tbody>
          {board.map((row, y) => (
            <tr key={y}>
              {row.map((isLit, x) => (
                <Cell
                  key={`${y}-${x}`}
                  id={`${y}-${x}`}
                  isLit={isLit}
                  flipCellsAroundMe={() => flipCellsAround([y, x])}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Board;
