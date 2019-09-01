export default class Cell {
  constructor(
    readonly x: number,
    readonly y: number,
    readonly value: number
  ) {}

  copy() {
    return new Cell(this.x, this.y, this.value)
  }

  withValue(value: number) {
    return new Cell(this.x, this.y, value)
  }

  equals(other: Cell) {
    return this.x === other.x
      && this.y === other.y
      && this.value === other.value
  }

  withPositionFrom(other: Cell) {
    return new Cell(other.x, other.y, this.value)
  }

  hasPosition(other: Cell) {
    return this.x === other.x && this.y === other.y
  }
}