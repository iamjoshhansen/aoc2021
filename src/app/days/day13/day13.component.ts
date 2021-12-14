import { Component, OnInit } from '@angular/core';
import { day13InputExample as input } from 'src/app/days/day13/day13-input';
import { Star } from 'src/app/star/star';
import { toInt } from 'src/app/utils';

interface Point {
  x: number;
  y: number;
}

type Axis = 'x' | 'y';

interface Instruction {
  axis: Axis;
  pos: number;
}

function numArrayToPoint(arr: number[]): Point {
  return { x: arr[0], y: arr[1] };
}

function getBoundingBox(points: Point[]) {
  return {
    top: Math.min(...points.map((p) => p.y)),
    left: Math.min(...points.map((p) => p.x)),
    right: Math.max(...points.map((p) => p.x)),
    bottom: Math.max(...points.map((p) => p.y)),
  };
}

function pointsToString(points: Point[]): string {
  const pointSet = new Set([...points.map((p) => `${p.x},${p.y}`)]);
  const box = getBoundingBox(points);
  const grid: boolean[][] = [];

  for (let y = box.top; y < box.bottom + 1; y++) {
    grid.push([]);
    for (let x = box.left; x < box.right + 1; x++) {
      const row = grid[grid.length - 1];
      row.push(pointSet.has(`${x},${y}`));
    }
  }

  return grid.map((row) => row.map((p) => (p ? '#' : ' ')).join('')).join('\n');
}

@Component({
  selector: 'app-day13',
  templateUrl: './day13.component.html',
  styleUrls: ['./day13.component.scss'],
})
export class Day13Component extends Star implements OnInit {
  override ngOnInit() {
    super.ngOnInit();
    this.input = input;
  }

  async solve(input: string) {
    const [rawPoints, rawInstructions] = input
      .split('\n\n')
      .map((section) => section.split('\n'));

    const points: Point[] = rawPoints
      .map((point) => point.split(',').map(toInt))
      .map(numArrayToPoint);
    const instructions: Instruction[] = rawInstructions.map((row) => {
      const [axis, rawPos] = row.split(' ')[2].split('=') as [Axis, string];
      const pos = parseInt(rawPos, 10);
      return {
        axis,
        pos,
      };
    });

    const foldPointOverX = (point: Point, pos: number): Point => {
      return {
        x: -Math.abs(point.x - pos) + pos,
        y: point.y,
      };
    };

    const foldPointOverY = (point: Point, pos: number): Point => {
      return {
        x: point.x,
        y: -Math.abs(point.y - pos) + pos,
      };
    };

    const fold = (points: Point[], pos: number, axis: Axis): Point[] => {
      const pointStringSet = new Set<string>();

      points.forEach((point) => {
        let p = {
          x: point.x,
          y: point.y,
        };
        if (axis === 'x') {
          p = foldPointOverX(p, pos);
        } else {
          p = foldPointOverY(p, pos);
        }
        const pointId = `${p.x},${p.y}`;
        pointStringSet.add(pointId);
      });

      return [...pointStringSet]
        .map((p) => p.split(',').map(toInt))
        .map(numArrayToPoint);
    };

    // console.log('Original');
    // console.log(pointsToString(points));

    const instruction = instructions[0];
    const finalPoints = fold(points, instruction.pos, instruction.axis);

    // let finalPoints = points;
    // instructions.forEach((instruction) => {
    //   finalPoints = fold(finalPoints, instruction.pos, instruction.axis);
    // });
    console.log(pointsToString(finalPoints));

    return `${finalPoints.length}`;
  }
}
