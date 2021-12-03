import { Component, OnInit } from '@angular/core';

import { Star } from '../../star/star';
import { textToArrayOfNumbers } from '../../utils/text-to-array-of-numbers';
import { day1InputExample as input } from 'src/app/days/day01/day1-input';

@Component({
  selector: 'app-day01',
  templateUrl: './day01.component.html',
  styleUrls: ['./day01.component.scss'],
})
export class Day01Component extends Star implements OnInit {
  override ngOnInit() {
    super.ngOnInit();
    this.input = input;
  }

  async solve(input: string) {
    const values = textToArrayOfNumbers(input);
    const deltas = this.getDeltas(values);
    const count = this.increaseCount(deltas);
    return `${count}`;
  }

  private getDeltas(values: number[]): number[] {
    const deltas: number[] = [];
    for (let i = 1; i < values.length; i++) {
      const line = values[i];
      const prev = values[i - 1];
      const delta = line - prev;
      deltas.push(delta);
    }
    return deltas;
  }

  private increaseCount(deltas: number[]): number {
    return deltas.reduce((a, c) => a + (c > 0 ? 1 : 0), 0);
  }
}
