import { Component, OnInit } from '@angular/core';
import { day8InputExample as input } from 'src/app/days/day08/day8-input';
import { Star } from 'src/app/star/star';
import { sum } from 'src/app/utils';

function difference(a: string, b: string): string {
  return a
    .split('')
    .filter((c) => !b.includes(c))
    .join('');
}

function union(items: string[]): string {
  let res = items[0];
  for (let i = 1; i < items.length; i++) {
    res = res
      .split('')
      .filter((c) => items[i].includes(c))
      .join('');
  }
  return res;
}

class Line {
  readonly signals = this.row.split('|')[0].trim().toLowerCase().split(' ');
  readonly outputs = this.row.split('|')[1].trim().toLowerCase().split(' ');

  readonly mapping: Record<string, string> = (() => {
    const [count2s, count3s, count4s, count5s, count6s] = [2, 3, 4, 5, 6].map(
      (count) =>
        this.signals
          .filter((signal) => signal.length === count)
          .map((signal) => signal.toLowerCase())
    );

    const count2 = count2s[0];
    const count3 = count3s[0];
    const count4 = count4s[0];

    const A = difference(count3, count4)[0];
    const BD = difference(count4, count3);
    const ADG = union(count5s);
    const DG = difference(ADG, A);
    const D = union([BD, DG]);
    const G = difference(DG, D);
    const B = difference(BD, D);
    const CF = count2;
    const CDE = difference('abcdefg', union(count6s));
    const C = union([CDE, CF]);
    const DE = difference(CDE, CF);
    const E = difference(DE, D);
    const F = difference('abcdefg', [A, B, C, D, E, G].join(''));

    // return { A, B, C, D, E, F, G };
    return {
      [A]: 'a',
      [B]: 'b',
      [C]: 'c',
      [D]: 'd',
      [E]: 'e',
      [F]: 'f',
      [G]: 'g',
    };
  })();

  decodeSignal(signal: string) {
    return signal
      .split('')
      .map((c) => this.mapping[c])
      .join('');
  }

  get digits(): number[] {
    return this.outputs.map((out) =>
      this.digitFromSignal(this.decodeSignal(out))
    );
  }

  get total() {
    return parseInt(this.digits.join(''), 10);
  }

  constructor(public readonly row: string) {}

  digitFromSignal(signal: string): number {
    const normalizedSignal = signal.split('').sort().join('').toUpperCase();
    return {
      ABCEFG: 0,
      CF: 1,
      ACDEG: 2,
      ACDFG: 3,
      BCDF: 4,
      ABDFG: 5,
      ABDEFG: 6,
      ACF: 7,
      ABCDEFG: 8,
      ABCDFG: 9,
    }[normalizedSignal]!;
  }
}

@Component({
  selector: 'app-day08-part2',
  templateUrl: './day08-part2.component.html',
  styleUrls: ['./day08-part2.component.scss'],
})
export class Day08Part2Component extends Star implements OnInit {
  override ngOnInit() {
    super.ngOnInit();
    this.input = input;
  }

  async solve(input: string) {
    const rows = input.split('\n');

    const lines = rows.map((line) => new Line(line));
    const totals = lines.map((line) => line.total);
    const total = sum(totals);

    return `${total}`;
  }
}
