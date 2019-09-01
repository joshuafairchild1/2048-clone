import * as React from 'react'
import Cell from '../model/Cell'

type Props = {
  cells: Cell[]
}

const BoardRow: React.FC<Props> = ({ cells }) => {
  return <div className="row">
    {cells.map(it =>
      <div
        key={it.x + it.y}
        className={`cell cell-${it.value}`}
      >
        {it.value}
      </div>)}
  </div>
}

export default BoardRow