import { Component, OnInit } from '@angular/core';
import { day6InputExample as input } from 'src/app/days/day06/day6-input';

import { Star } from 'src/app/star/star';
import { toInt } from 'src/app/utils/to-int';

class LanternFish {
  constructor(
    public timer: number,
    public readonly cycle = 7,
    public readonly initialDelay = 2
  ) {}

  update(): LanternFish | void {
    this.timer--;
    if (this.timer === -1) {
      this.timer = this.cycle - 1;
      return new LanternFish(
        this.cycle + this.initialDelay - 1,
        this.cycle,
        this.initialDelay
      );
    }
  }

  toString() {
    return `${this.timer}`;
  }
}

@Component({
  selector: 'app-day06',
  templateUrl: './day06.component.html',
  styleUrls: ['./day06.component.scss'],
})
export class Day06Component extends Star implements OnInit {
  override ngOnInit() {
    super.ngOnInit();
    this.input = input;
  }

  async solve(input: string) {
    const rows = input.split('\n');
    const timers = rows[0].split(',').map(toInt);

    const lanternFish: LanternFish[] = timers.map(
      (timer) => new LanternFish(timer)
    );

    // console.log(`Initial state: ${lanternFish.join(',')}`);

    for (let i = 0; i < 80; i++) {
      const newFish: LanternFish[] = [];
      lanternFish.forEach((fish) => {
        const spawn = fish.update();
        if (spawn) {
          newFish.push(spawn);
        }
      });
      newFish.forEach((fish) => lanternFish.push(fish));
      // console.log(
      //   `After ${(i + 1).toString().padStart(2)} days: ${lanternFish.join(',')}`
      // );
    }

    // console.log(`After 80 days: ${lanternFish.join(',')}`);

    return `${lanternFish.length}`;
  }
}
