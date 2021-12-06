import { Component, OnInit } from '@angular/core';
import { Star } from 'src/app/star/star';
import { day6InputExample as input } from 'src/app/days/day06/day6-input';
import { toInt, sum, copy } from 'src/app/utils';

class LanternFishSchool {
  private _counts: Record<number, number> = {};

  get counts() {
    return copy(this._counts);
  }

  get size(): number {
    return sum(Object.values(this._counts));
  }

  constructor(timers: number[] = []) {
    timers.forEach((timer) => this.addFish(timer));
  }

  private addFish(timer: number, count = 1) {
    this._counts[timer] = (this._counts[timer] ?? 0) + count;
  }

  liveOneDay() {
    const school = new LanternFishSchool();
    Object.keys(this._counts).forEach((timerString) => {
      const timer = parseInt(timerString, 10);
      const count = this._counts[timer];
      if (timer === 0) {
        school.addFish(6, count);
        school.addFish(8, count);
      } else {
        school.addFish(timer - 1, count);
      }
    });
    this._counts = school.counts;
  }

  toString() {
    let ret: number[] = [];
    Object.keys(this._counts).forEach((timerString) => {
      const timer = parseInt(timerString, 10);
      const count = this._counts[timer];
      ret = ret.concat(new Array(count).fill(timer));
    });
    return ret.join(',');
  }
}

@Component({
  selector: 'app-day06-part2',
  templateUrl: './day06-part2.component.html',
  styleUrls: ['./day06-part2.component.scss'],
})
export class Day06Part2Component extends Star implements OnInit {
  override ngOnInit() {
    super.ngOnInit();
    this.input = input;
  }

  async solve(input: string) {
    const rows = input.split('\n');

    const timers = rows[0].split(',').map(toInt);

    const school = new LanternFishSchool(timers);
    console.log(`Initial: ${school.size}, ${school}`);

    for (let i = 0; i < 256; i++) {
      school.liveOneDay();
      // console.log(`Day ${i + 1} count: ${school.size}, ${school}`);
    }

    return `${school.size}`;
  }
}
