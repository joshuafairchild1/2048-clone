import Cell from './Cell'
import { KNOWN_CELLS, listsEqual, mergeColumns, randomStartingCells } from './helpers'

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
      const prePopulated = randomStartingCells(KNOWN_CELLS)
      this.cells = KNOWN_CELLS.map(it => prePopulated.find(cell => it.hasPosition(cell)) || it)
    }
  }

  copy() {
    return new GameBoard(...this.cells)
  }

  shiftRight = () => {
    const [ first, second, third, fourth ] = this.chunkedByColumn()
    const [, fourthColumn ] = this.shiftHorizontal(third, fourth)
    const [, thirdColumn ] = this.shiftHorizontal(second, third)
    const [ firstColumn, secondColumn ] = this.shiftHorizontal(first, second)
    const nextCells = mergeColumns(firstColumn, secondColumn, thirdColumn, fourthColumn)
    this.finishShifting(nextCells, this.shiftRight)
  }

  shiftLeft = () => {
    const [ first, second, third, fourth ] = this.chunkedByColumn()
    const [, firstColumn ] = this.shiftHorizontal(second, first)
    const [, secondColumn ] = this.shiftHorizontal(third, second)
    const [ thirdColumn, fourthColumn ] = this.shiftHorizontal(fourth, third)
    const nextCells = mergeColumns(firstColumn, secondColumn, thirdColumn, fourthColumn)
    this.finishShifting(nextCells, this.shiftLeft)
  }

  shiftDown = () => {
    const [ first, second, third, fourth ] = this.chunkedByRow()
    const [, fourthRow ] = this.shiftVertical(third, fourth)
    const [, thirdRow ] = this.shiftVertical(second, third)
    const [ firstRow, secondRow ] = this.shiftVertical(first, second)
    const nextCells = [...firstRow, ...secondRow, ...thirdRow, ...fourthRow]
    this.finishShifting(nextCells, this.shiftDown)
  }

  shiftUp = () => {
    const [ first, second, third, fourth ] = this.chunkedByRow()
    const [, firstRow ] = this.shiftVertical(second, first)
    const [, secondRow ] = this.shiftVertical(third, second)
    const [ thirdRow, fourthRow ] = this.shiftVertical(fourth, third)
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
    this.cells.length = 0
    this.cells.push(...nextCells)
    continueShifting()
  }

  private shiftVertical(rowOrColumn: Cell[], destination: Cell[]) {
    return this.shiftRows(rowOrColumn, destination, Direction.Vertical)
  }

  private shiftHorizontal(rowOrColumn: Cell[], destination: Cell[]) {
    return this.shiftRows(rowOrColumn, destination, Direction.Horizontal)
  }

  private shiftRows(rowOrColumn: Cell[], destination: Cell[], direction: Direction) {
    const targetAxis = direction === Direction.Vertical ? 'y' : 'x'
    for (const [index, cell] of rowOrColumn.entries()) {
      const nextCellDownIndex = destination.findIndex(it => it[targetAxis] === cell[targetAxis])
      const nextCellDown = destination[nextCellDownIndex]
      if (nextCellDown.value === 0) {
        destination[nextCellDownIndex] = cell.withPositionFrom(nextCellDown)
        rowOrColumn[index] = cell.copy(0)
      } else if (nextCellDown.value === cell.value) {
        destination[nextCellDownIndex] = nextCellDown.copy(nextCellDown.value * 2)
        rowOrColumn[index] = cell.copy(0)
      }
    }
    return [ rowOrColumn, destination ]
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

}