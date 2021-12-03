import { Component, OnInit } from '@angular/core';

import { Star } from '../../star/star';
import { day3InputA as input } from 'src/app/days/day03/day3-input';

@Component({
  selector: 'app-day03',
  templateUrl: './day03.component.html',
  styleUrls: ['./day03.component.scss'],
})
export class Day03Component extends Star implements OnInit {
  override ngOnInit() {
    super.ngOnInit();
    this.input = input;
  }

  async solve(input: string) {
    const rows = input.split('\n');
    const length = rows[0].length;

    const result = [...new Array(length)].map((_) => 0);

    rows.forEach((line) => {
      const row = line.split('').map((c) => parseInt(c, 10));
      const delta = row.map((b) => b * 2 - 1);
      delta.forEach((d, i) => (result[i] += d));
    });

    const gamma = result.map((r) => (r > 0 ? 1 : 0));
    const epsilon = result.map((r) => (r < 0 ? 1 : 0));

    const gammaDecimal = parseInt(gamma.join(''), 2);
    const epsilonDecimal = parseInt(epsilon.join(''), 2);

    return `${gammaDecimal * epsilonDecimal}`;
  }
}
