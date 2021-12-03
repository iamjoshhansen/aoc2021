import { Component, OnInit } from '@angular/core';
import { day2InputExample as input } from 'src/app/days/day02/day2-input';

import { Star } from '../../star/star';

enum Command {
  forward = 'forward',
  down = 'down',
  up = 'up',
}

class Submarine {
  depth = 0;
  horiz = 0;
  aim = 0;

  down(amount: number) {
    this.aim += amount;
  }

  up(amount: number) {
    this.aim -= amount;
  }

  forward(amount: number) {
    this.horiz += amount;
    this.depth += this.aim * amount;
  }
}

@Component({
  selector: 'app-day02-part2',
  templateUrl: './day02-part2.component.html',
  styleUrls: ['./day02-part2.component.scss'],
})
export class Day02Part2Component extends Star implements OnInit {
  override ngOnInit() {
    super.ngOnInit();
    this.input = input;
  }

  async solve(input: string) {
    const rows = input.split('\n');

    const submarine = new Submarine();

    rows.forEach((row) => {
      const [command, amountString] = row.split(' ') as [Command, string];
      const amount = parseInt(amountString, 10);
      submarine[command](amount);
    });

    return `${submarine.depth * submarine.horiz}`;
  }
}
