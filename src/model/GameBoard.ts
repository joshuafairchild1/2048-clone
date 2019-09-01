import Cell from './Cell'
import { getAvailableCell, KNOWN_CELLS, listsEqual, mergeColumns } from './helpers'

enum Direction {
  Vertical = 'Vertical',
  Horizontal = 'Horizontal'
}

export default class GameBoard {

  readonly cells: Cell[] = []

  constructor(...cells: Cell[]) {
    if (cells.length === KNOWN_CELLS.length) {
      this.cells = cells
    } else {
      const first = getAvailableCell(KNOWN_CELLS, []).withValue(2)
      const second = getAvailableCell(KNOWN_CELLS, [ first ]).withValue(2)
      const prePopulated = [ first, second ]
      this.cells = KNOWN_CELLS
        .map(it => prePopulated.find(cell => it.hasPosition(cell)) || it)
    }
  }

  copy() {
    return new GameBoard(...this.cells)
  }

  enableNewCell() {
    const unavailable = this.cells.filter(it => it.value > 0)
    if (unavailable.length === this.cells.length) {
      return
    }
    const newCell = getAvailableCell(this.cells, unavailable).withValue(2)
    const nextList = this.cells.map(it => it.hasPosition(newCell) ? newCell : it)
    this.setList(nextList)
  }

  shiftRight = () => {
    const [ first, second, third, fourth ] = this.chunkedByColumn()
    const [, fourthColumn ] = this.shiftHorizontal(third, fourth)
    const [, thirdColumn ] = this.shiftHorizontal(second, third)
    const [ firstColumn, secondColumn ] = this.shiftHorizontal(first, second)
    const nextCells = mergeColumns(firstColumn, secondColumn, thirdColumn, fourthColumn)
    this.finishShifting(nextCells, this.shiftRight)
  }

  shiftDown = () => {
    const [ first, second, third, fourth ] = this.chunkedByRow()
    const [, fourthRow ] = this.shiftVertical(third, fourth)
    const [, thirdRow ] = this.shiftVertical(second, third)
    const [ firstRow, secondRow ] = this.shiftVertical(first, second)
    const nextCells = [...firstRow, ...secondRow, ...thirdRow, ...fourthRow]
    this.finishShifting(nextCells, this.shiftDown)
  }

  shiftLeft = () => {
    const [ first, second, third, fourth ] = this.chunkedByColumn()
    const [, firstColumn ] = this.shiftHorizontal(second, first)
    const [, secondColumn ] = this.shiftHorizontal(third, second)
    const [ fourthColumn, thirdColumn ] = this.shiftHorizontal(fourth, third)
    const nextCells = mergeColumns(firstColumn, secondColumn, thirdColumn, fourthColumn)
    this.finishShifting(nextCells, this.shiftLeft)
  }

  shiftUp = () => {
    const [ first, second, third, fourth ] = this.chunkedByRow()
    const [, firstRow ] = this.shiftVertical(second, first)
    const [, secondRow ] = this.shiftVertical(third, second)
    const [ fourthRow, thirdRow ] = this.shiftVertical(fourth, third)
    const nextCells = [...firstRow, ...secondRow, ...thirdRow, ...fourthRow]
    this.finishShifting(nextCells, this.shiftUp)
  }

  chunkedByRow() {
    return this.chunked(Direction.Horizontal)
  }

  chunkedByColumn() {
    return this.chunked(Direction.Vertical)
  }

  private finishShifting(nextCells: Cell[], continueShifting: VoidFunction) {
    if (listsEqual(nextCells, this.cells)) {
      return
    }
    this.setList(nextCells)
    continueShifting()
  }

  private shiftVertical(rowOrColumn: Cell[], destination: Cell[]) {
    return this.shift(rowOrColumn, destination, Direction.Vertical)
  }

  private shiftHorizontal(rowOrColumn: Cell[], destination: Cell[]) {
    return this.shift(rowOrColumn, destination, Direction.Horizontal)
  }

  private shift(from: Cell[], destination: Cell[], direction: Direction) {
    const targetAxis = direction === Direction.Vertical ? 'y' : 'x'
    for (const [index, cellToMove] of from.entries()) {
      const cellDestination = destination.findIndex(it => it[targetAxis] === cellToMove[targetAxis])
      const cellInTheWay = destination[cellDestination]
      if (cellInTheWay.value === 0) {
        destination[cellDestination] = cellToMove.withPositionFrom(cellInTheWay)
        from[index] = cellToMove.withValue(0)
      } else if (cellInTheWay.value === cellToMove.value) {
        destination[cellDestination] = cellInTheWay.withValue(cellInTheWay.value * 2)
        from[index] = cellToMove.withValue(0)
      }
    }
    return [ from, destination ]
  }

  private chunked(direction: Direction): [ Cell[], Cell[], Cell[], Cell[] ] {
    const first: Cell[] = []
    const second: Cell[] = []
    const third: Cell[] = []
    const fourth: Cell[] = []
    const axis = direction === Direction.Vertical ? 'y' : 'x'
    for (const cell of this.cells.map(it => it.copy())) {
      switch (cell[axis]) {
        case 0: first.push(cell); break
        case 1: second.push(cell); break
        case 2: third.push(cell); break
        case 3: fourth.push(cell)
      }
    }
    return [ first, second, third, fourth ]
  }

  private setList(newList: Cell[]) {
    this.cells.length = 0
    this.cells.push(...newList)
  }

}