import { Component, OnInit } from '@angular/core';
import { day3InputExample as input } from 'src/app/days/day03/day3-input';

import { Star } from '../../star/star';

type Bin = 0 | 1;

class Counter {
  readonly counts = [0, 0];
  add(val: Bin) {
    this.counts[val]++;
  }

  get most(): Bin {
    return this.counts[0] > this.counts[1] ? 0 : 1;
  }

  get least(): Bin {
    return (1 - this.most) as Bin;
  }
}

@Component({
  selector: 'app-day03-part2',
  templateUrl: './day03-part2.component.html',
  styleUrls: ['./day03-part2.component.scss'],
})
export class Day03Part2Component extends Star implements OnInit {
  override ngOnInit() {
    super.ngOnInit();
    this.input = input;
  }

  async solve(input: string) {
    const lines = input.split('\n');
    const rows: Bin[][] = lines.map((line) =>
      line.split('').map((c) => parseInt(c, 10) as Bin)
    );

    function getRating(set: Bin[][], mode: 'oxygen' | 'co2', bit = 0): string {
      console.log(
        `[${bit}] ${mode} rows:\n  ${set.map((r) => r.join('')).join('\n  ')}`
      );
      if (set.length === 1) {
        return set[0].join('');
      }

      const counter = new Counter();
      set.forEach((row) => counter.add(row[bit]));
      const val = mode === 'oxygen' ? counter.most : counter.least;
      console.log(`val (${counter.counts}): ${val}`);

      const filteredRows = set.filter((row) => row[bit] === val);
      return getRating(filteredRows, mode, bit + 1);
    }

    const oxygen = getRating(rows, 'oxygen');
    const co2 = getRating(rows, 'co2');

    const oxygenDec = parseInt(oxygen, 2);
    const co2Dec = parseInt(co2, 2);

    return `${oxygenDec * co2Dec}`;
  }
}
