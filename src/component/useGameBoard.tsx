import GameBoard from '../model/GameBoard'
import { useState } from 'react'

export default function useGameBoard() {
  const [ board, setBoard ] = useState(new GameBoard())
  const runAndSave = (method: VoidFunction) => {
    return () => {
      method()
      setBoard(board.copy())
    }
  }
  return {
    rows: board.chunkedByRow(),
    shiftUp: runAndSave(board.shiftUp),
    shiftDown: runAndSave(board.shiftDown),
    shiftRight: runAndSave(board.shiftRight),
    shiftLeft: runAndSave(board.shiftLeft)
  }
}