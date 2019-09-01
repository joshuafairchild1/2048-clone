import Cell from './Cell'

export default class GameBoard {

  readonly cells: Cell[] = []

  constructor() {
    const prePopulated = randomStartingCells(KNOWN_CELLS)
    this.cells = KNOWN_CELLS.map(it => prePopulated.find(cell => it.hasPosition(cell)) || it)
  }

  chunkedByRow(): [ Cell[], Cell[], Cell[], Cell[] ] {
    const first: Cell[] = []
    const second: Cell[] = []
    const third: Cell[] = []
    const fourth: Cell[] = []
    for (const cell of this.cells) {
      switch (cell.x) {
        case 0: first.push(cell); break
        case 1: second.push(cell); break
        case 2: third.push(cell); break
        case 3: fourth.push(cell)
      }
    }
    return [ first, second, third, fourth ]
  }

}

const KNOWN_CELLS = [
  new Cell(0, 0, 0),
  new Cell(0, 1, 0),
  new Cell(0, 2, 0),
  new Cell(0, 3, 0),
  new Cell(1, 0, 0),
  new Cell(1, 1, 0),
  new Cell(1, 2, 0),
  new Cell(1, 3, 0),
  new Cell(2, 0, 0),
  new Cell(2, 1, 0),
  new Cell(2, 2, 0),
  new Cell(2, 3, 0),
  new Cell(3, 0, 0),
  new Cell(3, 1, 0),
  new Cell(3, 2, 0),
  new Cell(3, 3, 0)
]

function randomStartingCells(initial: Cell[]) {
  const first = getRandomCell(initial, []).copy(2)
  const second = getRandomCell(initial, [ first ]).copy(2)
  return [ first, second ]
}

function getRandomCell(collection: Cell[], exclude: Cell[]): Cell {
  const position = Math.floor(Math.random() * collection.length)
  const item = collection[position]
  console.warn('item', item)
  if (exclude.some(it => it.hasPosition(item))) {
    return getRandomCell(collection, exclude)
  }
  return item
}