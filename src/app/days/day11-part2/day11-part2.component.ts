import { Component, OnInit } from '@angular/core';
import { day11InputA as input } from 'src/app/days/day11/day11-input';

import { Star } from '../../star/star';

interface Position {
  x: number;
  y: number;
}

class Grid<T> {
  readonly width = this.values[0].length;
  readonly height = this.values.length;

  constructor(public readonly values: T[][]) {}

  *positionGenerator(): Generator<Position> {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        yield { x, y };
      }
    }
  }

  *iterate(): Generator<{
    position: Position;
    value: T;
  }> {
    for (let position of this.positionGenerator()) {
      yield {
        position,
        value: this.getValue(position)!,
      };
    }
  }

  *allValues(): Generator<T> {
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
    return this.values[y][x];
  }

  vhNeighborPositions({ x, y }: Position): Position[] {
    return [
      { x, y: y - 1 }, // top
      { x: x - 1, y }, // left
      { x: x + 1, y }, // right
      { x, y: y + 1 }, // bottom
    ].filter((pos) => this.isInDomain(pos));
  }

  diagnalNeighborPositions({ x, y }: Position): Position[] {
    return [
      { x: x + 1, y: y - 1 }, // top right
      { x: x + 1, y: y + 1 }, // bottom right
      { x: x - 1, y: y + 1 }, // bottom left
      { x: x - 1, y: y - 1 }, // top left
    ].filter((pos) => this.isInDomain(pos));
  }

  eightNeighborPositions(pos: Position): Position[] {
    return this.vhNeighborPositions(pos).concat(
      this.diagnalNeighborPositions(pos)
    );
  }
}

class DumboOctopus {
  public flashing = false;

  readonly neighbors = new Set<DumboOctopus>();

  constructor(public energy: number) {}

  reset() {
    return (this.flashing = false);
  }

  energize() {
    if (!this.flashing) {
      this.energy++;
      if (this.energy > 9) {
        this.flash();
      }
    }
  }

  private flash() {
    this.flashing = true;
    this.energy = 0;

    this.neighbors.forEach((n) => n.energize());
  }

  toString() {
    return this.energy;
  }
}

@Component({
  selector: 'app-day11-part2',
  templateUrl: './day11-part2.component.html',
  styleUrls: ['./day11-part2.component.scss'],
})
export class Day11Part2Component extends Star implements OnInit {
  override ngOnInit() {
    super.ngOnInit();
    this.input = input;
  }

  async solve(input: string) {
    const rows = input.split('\n');
    const octopi = rows.map((row) =>
      row
        .split('')
        .map((e) => parseInt(e, 10))
        .map((e) => new DumboOctopus(e))
    );

    const grid = new Grid(octopi);

    for (let { position, value: octopus } of grid.iterate()) {
      grid
        .eightNeighborPositions(position)
        .map((pos) => grid.getValue(pos)!)
        .forEach((n) => octopus.neighbors.add(n));
    }

    const logGrid = () => {
      console.log(grid.values.map((row) => row.join('')).join('\n'));
    };

    logGrid();

    const count = [...grid.allValues()].length;
    let flashCount = 0;
    let step = -1;

    while (++step < 1000000 && flashCount < count) {
      [...grid.allValues()].forEach((octopus) => octopus.reset());

      for (let { position, value: octopus } of grid.iterate()) {
        octopus.energize();
      }

      flashCount = [...grid.allValues()].filter(
        (octopus) => octopus.flashing
      ).length;

      console.group(step + 1);
      logGrid();
      console.log(`count: ${flashCount}`);
      console.groupEnd();
    }

    return `${step}`;
  }
}
