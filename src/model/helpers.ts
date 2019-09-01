import Cell from './Cell'

export const KNOWN_CELLS = [
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

export function getAvailableCell(from: Cell[], exclude: Cell[]): Cell {
  const index = Math.floor(Math.random() * from.length)
  const cell = from[index]
  if (exclude.some(it => it.hasPosition(cell))) {
    return getAvailableCell(from, exclude)
  }
  return cell
}

export function listsEqual(cellsA: Cell[], cellsB: Cell[]) {
  for (const [index, cell] of cellsA.entries()) {
    if (!cellsB[index].equals(cell)) {
      return false
    }
  }
  return true
}

export function mergeColumns(...columns: Cell[][]) {
  const cells: Cell[] = []
  for (const [rowIndex] of columns.entries()) {
    for (const [columnNumber] of columns.entries()) {
      cells.push(columns[columnNumber][rowIndex])
    }
  }
  return cells
}