import { Component, OnInit } from '@angular/core';
import { day9InputExample as input } from 'src/app/days/day09/day9-input';
import { Star } from 'src/app/star/star';
import { sum } from 'src/app/utils';

interface Position {
  x: number;
  y: number;
}

class Grid {
  readonly width = this.heights[0].length;
  readonly height = this.heights.length;

  constructor(public readonly heights: number[][]) {}

  *lowPointPositionGenerator(): Generator<Position> {
    for (let pos of this.positionGenerator()) {
      if (this.isCellLowpoint(pos)) {
        yield pos;
      }
    }
  }

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

  getNeighborHeights({ x, y }: Position) {
    return [
      this.getHeight({ x, y: y - 1 }), // top
      this.getHeight({ x: x - 1, y }), // left
      this.getHeight({ x: x + 1, y }), // right
      this.getHeight({ x, y: y + 1 }), // bottom
    ].filter((h) => h !== null) as number[];
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
}

@Component({
  selector: 'app-day09',
  templateUrl: './day09.component.html',
  styleUrls: ['./day09.component.scss'],
})
export class Day09Component extends Star implements OnInit {
  override ngOnInit() {
    super.ngOnInit();
    this.input = input;
  }

  // grid: {height:number,isLowPoint:boolean}[][] = [];

  grid?: Grid;

  async solve(input: string) {
    const rows = input.split('\n');
    const heights = rows.map((row) =>
      row.split('').map((c) => parseInt(c, 10))
    );

    const start = new Date().getTime();

    const grid = new Grid(heights);

    const lowPointPositions = [...grid.lowPointPositionGenerator()];
    const lowPointHeights = lowPointPositions.map(
      (pos) => grid.getHeight(pos)!
    );
    const riskLevels = lowPointHeights.map((height) => height + 1);
    const totalRiskLevel = sum(riskLevels);

    const delta = new Date().getTime() - start;
    console.log(`Time to process: ${delta}`);

    this.grid = grid;

    // this.grid = [];
    // for (let y=0; y<grid.height; y++) {
    //   this.grid.push([]);
    // }

    return `${totalRiskLevel}`;
  }
}
