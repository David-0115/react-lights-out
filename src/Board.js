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

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.33 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = Array.from({ length: nrows }, () => Array.from({ length: ncols }, () => Math.random() < chanceLightStartsOn));
    // TODO: create array-of-arrays of true/false values
    return initialBoard;
  }

  function hasWon() {
    for (let row of board) {
      for (let cell of row) {
        if (cell === true) return false
      }
    }
    return true
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {

      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        console.log("flipCell triggered")
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          console.log("flipCell cond = true")
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = [];
      oldBoard.forEach((arr) => {
        boardCopy.push([...arr])
      })

      // TODO: in the copy, flip this cell and the cells around it
      const positionsToFlip = [
        [0, 0], //self
        [0, 1], //right
        [0, -1], //left
        [-1, 0], //up
        [1, 0] //down
      ]

      positionsToFlip.forEach(([nx, ny]) => {
        const newX = x + nx;
        const newY = y + ny;
        flipCell(newY, newX, boardCopy)
      });

      // TODO: return the copy
      return boardCopy
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return (
      <div>
        You Won!
      </div>
    )
  } else {
    return (
      <div>
        <table>
          <tbody>
            {board.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {row.map((cell, cellIdx) => (
                  <Cell flipCellsAroundMe={flipCellsAround} isLit={cell} coord={`${rowIdx}-${cellIdx}`} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  // TODO

  // make table board

  // TODO
}

export default Board;