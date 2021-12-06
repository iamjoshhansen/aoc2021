import { Component, OnInit } from '@angular/core';
import { day1InputExample as input } from 'src/app/days/day01/day1-input';

import { Star } from '../../star/star';
import { textToArrayOfNumbers } from 'src/app/utils';

@Component({
  selector: 'app-day01-part2',
  templateUrl: './day01-part2.component.html',
  styleUrls: ['./day01-part2.component.scss'],
})
export class Day01Part2Component extends Star implements OnInit {
  override ngOnInit() {
    super.ngOnInit();
    this.input = input;
  }

  slidingValues = '';
  deltas = '';

  async solve(input: string) {
    const values = textToArrayOfNumbers(input);
    const slidingValues = this.getSlidingValues(values, 3);
    const deltas = this.getDeltas(slidingValues);
    const count = this.increaseCount(deltas);
    return `${count}`;
  }

  private getSlidingValues(values: number[], size: number): number[] {
    const slidingValues: number[] = [];
    const count = values.length;

    for (let i = 0; i < count - (size - 1); i++) {
      let value = 0;
      for (let s = 0; s < size; s++) {
        if (i + s < count) {
          value += values[i + s];
        }
      }
      slidingValues.push(value);
    }

    this.slidingValues = slidingValues.join('\n');
    return slidingValues;
  }

  private getDeltas(values: number[]): number[] {
    const deltas: number[] = [];
    for (let i = 1; i < values.length; i++) {
      const line = values[i];
      const prev = values[i - 1];
      const delta = line - prev;
      deltas.push(delta);
    }

    this.deltas = deltas.join('\n');
    return deltas;
  }

  private increaseCount(deltas: number[]): number {
    return deltas.reduce((a, c) => a + (c > 0 ? 1 : 0), 0);
  }
}
