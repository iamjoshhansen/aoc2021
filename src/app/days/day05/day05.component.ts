import { Component, OnInit } from '@angular/core';
import { day5InputExample as input } from 'src/app/days/day05/day5-input';
import { Star } from 'src/app/star/star';
import { range } from 'src/app/utils';

interface Point {
  x: number;
  y: number;
}

function pointToId(point: Point): string {
  return `${point.x},${point.y}`;
}

class Segment {
  get isHorizontal() {
    return this.y1 === this.y2;
  }

  get isVertical() {
    return this.x1 === this.x2;
  }

  get points(): null | Point[] {
    if (this.isHorizontal) {
      const min = Math.min(this.x1, this.x2);
      const max = Math.max(this.x1, this.x2);
      return [...range(min, max)].map((x) => ({ x, y: this.y1 }));
    }

    if (this.isVertical) {
      const min = Math.min(this.y1, this.y2);
      const max = Math.max(this.y1, this.y2);
      return [...range(min, max)].map((y) => ({ y, x: this.x1 }));
    }

    return null;
  }

  constructor(
    public readonly x1: number,
    public readonly y1: number,
    public readonly x2: number,
    public readonly y2: number
  ) {}
}

@Component({
  selector: 'app-day05',
  templateUrl: './day05.component.html',
  styleUrls: ['./day05.component.scss'],
})
export class Day05Component extends Star implements OnInit {
  override ngOnInit() {
    super.ngOnInit();
    this.input = input;
  }

  async solve(input: string) {
    const rows = input.split('\n');

    const segments = rows.map((row) => {
      const [one, two] = row.split(' -> ');
      const [x1s, y1s] = one.split(',');
      const [x2s, y2s] = two.split(',');
      const x1 = parseInt(x1s, 10);
      const x2 = parseInt(x2s, 10);
      const y1 = parseInt(y1s, 10);
      const y2 = parseInt(y2s, 10);
      return new Segment(x1, y1, x2, y2);
    });

    const allPoints = new Map<string, number>();

    segments.forEach((segment) => {
      const points = segment.points;
      if (points) {
        points.forEach((point) => {
          const id = pointToId(point);
          allPoints.set(id, (allPoints.get(id) ?? 0) + 1);
        });
      }
    });

    const intersectionCount = [...allPoints.values()].filter(
      (v) => v > 1
    ).length;

    let map = '';
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const id = pointToId({ x, y });
        map += allPoints.get(id) ?? '.';
      }
      map += '\n';
    }
    console.log(map);

    return `${intersectionCount}`;
  }
}
