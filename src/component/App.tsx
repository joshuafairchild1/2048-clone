import * as React from 'react'
import BoardRow from './BoardRow'
import useGameBoard from './useGameBoard'

import './App.scss'

const App: React.FC = () => {
  const board = useGameBoard()
  const rows = board.chunkedByRow()
  return <div className="game-board">
    {rows.map((it, index) => <BoardRow key={index} cells={it}/>)}
  </div>
}

export default App