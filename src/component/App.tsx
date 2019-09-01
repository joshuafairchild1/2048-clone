import * as React from 'react'
import BoardRow from './BoardRow'
import useGameBoard from './useGameBoard'
import { useEffect } from 'react'

import './App.scss'

const App: React.FC = () => {
  const { rows, ...controls } = useGameBoard()

  useEffect(() => {
    window.addEventListener('keydown', ({ key }) => {
      switch (key) {
        case 'ArrowUp': return controls.shiftUp()
        case 'ArrowDown': return controls.shiftDown()
        case 'ArrowRight': return controls.shiftRight()
        case 'ArrowLeft': return controls.shiftLeft()
      }
    })
  }, [])

  return <div className="game-board">
    {rows.map((it, index) => <BoardRow key={index} cells={it}/>)}
  </div>
}

export default App