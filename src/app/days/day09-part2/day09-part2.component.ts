import { Component, OnInit } from '@angular/core';
import { day9InputExample as input } from 'src/app/days/day09/day9-input';
import { Star } from 'src/app/star/star';
import { multiply } from 'src/app/utils';

interface Position {
  x: number;
  y: number;
}

class Grid {
  readonly width = this.heights[0].length;
  readonly height = this.heights.length;

  *lowPointPositionGenerator(): Generator<Position> {
    for (let pos of this.positionGenerator()) {
      if (this.isCellLowpoint(pos)) {
        yield pos;
      }
    }
  }

  constructor(public readonly heights: number[][]) {}

  *positionGenerator(): Generator<Position> {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        yield { x, y };
      }
    }
  }

  isInDomain({ x, y }: Position) {
    return x > -1 && x < this.width && y > -1 && y < this.height;
  }

  getHeight({ x, y }: Position): number | null {
    if (!this.isInDomain({ x, y })) {
      return null;
    }
    return this.heights[y][x];
  }

  getNeighborHeights(pos: Position) {
    return this.getNeighborPositions(pos).map((pos) => this.getHeight(pos)!);
  }

  getNeighborPositions({ x, y }: Position) {
    return [
      { x, y: y - 1 }, // top
      { x: x - 1, y }, // left
      { x: x + 1, y }, // right
      { x, y: y + 1 }, // bottom
    ].filter((pos) => this.isInDomain(pos));
  }

  isCellLowpoint({ x, y }: Position): boolean {
    const cell = this.getHeight({ x, y });
    if (cell === null) {
      return false;
    }

    const neighbors = this.getNeighborHeights({ x, y });
    const lowestNeighbor = Math.min(...neighbors);

    return cell < lowestNeighbor;
  }

  getBasonPositions(lowPoint: Position) {
    const positions = new Map<string, Position>();

    const posId = (pos: Position) => `${pos.x},${pos.y}`;

    const outline = new Map<string, Position>([[posId(lowPoint), lowPoint]]);

    while (outline.size > 0) {
      outline.forEach((pos, id) => positions.set(id, pos));
      const newOutline = new Map<string, Position>();
      outline.forEach((pos, id) => {
        this.getNeighborPositions(pos)
          // Don't get into 9
          .filter((p) => this.getHeight(p)! < 9)
          // Don't add something already in `positions`
          .filter((p) => !positions.has(posId(p)))
          // Don't add something already in `outline`
          .filter((p) => !outline.has(posId(p)))
          // for everything else, add to newOutline
          .forEach((p) => newOutline.set(posId(p), p));
      });
      outline.clear();
      newOutline.forEach((p, id) => outline.set(id, p));
    }

    return [...positions.values()];
  }
}

@Component({
  selector: 'app-day09-part2',
  templateUrl: './day09-part2.component.html',
  styleUrls: ['./day09-part2.component.scss'],
})
export class Day09Part2Component extends Star implements OnInit {
  override ngOnInit() {
    super.ngOnInit();
    this.input = input;
  }

  grid?: Grid;

  async solve(input: string) {
    const rows = input.split('\n');
    const heights = rows.map((row) =>
      row.split('').map((c) => parseInt(c, 10))
    );

    const start = new Date().getTime();

    const grid = new Grid(heights);
    this.grid = grid;

    const lowPointPositions = [...grid.lowPointPositionGenerator()];

    // console.log(lowPointPositions);

    const basins = lowPointPositions.map((pos) => grid.getBasonPositions(pos));
    // console.log(basins);

    // console.log(
    //   basins.map((basin, i) => {
    //     return {
    //       low: lowPointPositions[i],
    //       heights: basin.map((pos) => grid.getHeight(pos)),
    //     };
    //   })
    // );

    const basinSizes = basins.map((basin) => basin.length);
    // console.log(basinSizes);
    basinSizes.sort((a, b) => b - a);
    // console.log(basinSizes, `(sorted)`);

    const topThreeBasinSizes = basinSizes.slice(0, 3);
    // console.log(topThreeBasinSizes);

    const result = multiply(topThreeBasinSizes);

    const delta = new Date().getTime() - start;
    console.log(`Time to process: ${delta}`);

    return `${topThreeBasinSizes.join(' * ')} = ${result}`;
  }
}
