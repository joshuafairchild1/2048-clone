import GameBoard from '../model/GameBoard'

export default function useGameBoard(): GameBoard {
  return new GameBoard()
}