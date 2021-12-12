interface Position {
  x: number;
  y: number;
}

interface ValueAndPosition<T> {
  position: Position;
  value: T;
}

// type ValueIdentifier<T> = (value: T, position: Position) => string;

// function defaultIdentifier<T>(value: T, position: Position) {
//   return `${position.x},${position.y}`;
// }

export class Grid2D<T> {
  readonly width = this.values2D[0].length;
  readonly height = this.values2D.length;
  readonly size = this.width * this.height;

  get values(): T[] {
    return [...this.valuesGenerator()];
  }

  get valuesAndPositions(): ValueAndPosition<T>[] {
    return [...this.valuesAndPositionsGenerator()];
  }

  constructor(
    public readonly values2D: T[][] = [] // identifier: ValueIdentifier<T> = defaultIdentifier
  ) {}

  *positionGenerator(): Generator<Position> {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        yield { x, y };
      }
    }
  }

  *valuesAndPositionsGenerator(): Generator<ValueAndPosition<T>> {
    for (let position of this.positionGenerator()) {
      yield {
        position,
        value: this.getValue(position)!,
      };
    }
  }

  *valuesGenerator(): Generator<T> {
    for (let position of this.positionGenerator()) {
      yield this.getValue(position)!;
    }
  }

  isInDomain({ x, y }: Position) {
    return x > -1 && x < this.width && y > -1 && y < this.height;
  }

  getValue({ x, y }: Position): T | null {
    if (!this.isInDomain({ x, y })) {
      return null;
    }
    return this.values2D[y][x];
  }

  neighborsFromSides({ x, y }: Position): T[] {
    return [
      { x, y: y - 1 }, // top
      { x: x - 1, y }, // left
      { x: x + 1, y }, // right
      { x, y: y + 1 }, // bottom
    ]
      .filter((pos) => this.isInDomain(pos))
      .map((pos) => this.getValue(pos)!);
  }

  neighborsFromDiagnals({ x, y }: Position): T[] {
    return [
      { x: x + 1, y: y - 1 }, // top right
      { x: x + 1, y: y + 1 }, // bottom right
      { x: x - 1, y: y + 1 }, // bottom left
      { x: x - 1, y: y - 1 }, // top left
    ]
      .filter((pos) => this.isInDomain(pos))
      .map((pos) => this.getValue(pos)!);
  }

  neighbors(pos: Position): T[] {
    return this.neighborsFromSides(pos).concat(this.neighborsFromDiagnals(pos));
  }

  // fillFromPosition(
  //   pos: Position,
  //   include: (value: T, pos: Position) => boolean
  // ) {
  //   //
  // }
}
