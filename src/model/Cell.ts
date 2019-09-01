export default class Cell {
  constructor(
    readonly x: number,
    readonly y: number,
    readonly value: number
  ) {}

  copy(value = this.value) {
    return new Cell(this.x, this.y, value)
  }

  equals(other: Cell) {
    return this.x === other.x
      && this.y === other.y
      && this.value === other.value
  }

  hasPosition(other: Cell) {
    return this.x === other.x && this.y === other.y
  }
}