import GameBoard from '../model/GameBoard'
import { useState } from 'react'
import { listsEqual } from '../model/helpers'

export default function useGameBoard() {
  const [ board, setBoard ] = useState(new GameBoard())
  const commitMoveAndSave = (executeMove: VoidFunction) => {
    return () => {
      const previousCells = Array.from(board.cells)
      executeMove()
      if (!listsEqual(previousCells, board.cells)) {
        board.enableNewCell()
      }
      setBoard(board.copy())
    }
  }
  return {
    rows: board.chunkedByRow(),
    shiftUp: commitMoveAndSave(board.shiftUp),
    shiftDown: commitMoveAndSave(board.shiftDown),
    shiftRight: commitMoveAndSave(board.shiftRight),
    shiftLeft: commitMoveAndSave(board.shiftLeft)
  }
}