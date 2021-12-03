import { Component, OnInit } from '@angular/core';

import { Star } from '../../star/star';
import { day2InputExample as input } from 'src/app/days/day02/day2-input';

enum Command {
  forward = 'forward',
  down = 'down',
  up = 'up',
}

class Submarine {
  depth = 0;
  horiz = 0;

  down(amount: number) {
    this.depth += amount;
  }

  up(amount: number) {
    this.depth -= amount;
  }

  forward(amount: number) {
    this.horiz += amount;
  }
}

@Component({
  selector: 'app-day02',
  templateUrl: './day02.component.html',
  styleUrls: ['./day02.component.scss'],
})
export class Day02Component extends Star implements OnInit {
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
