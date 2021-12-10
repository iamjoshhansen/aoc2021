import { Component, OnInit } from '@angular/core';
import { Star } from 'src/app/star/star';
import { day7InputExample as input } from 'src/app/days/day07/day7-input';
import { range, sum, toInt } from 'src/app/utils';

@Component({
  selector: 'app-day07-part2',
  templateUrl: './day07-part2.component.html',
  styleUrls: ['./day07-part2.component.scss'],
})
export class Day07Part2Component extends Star implements OnInit {
  override ngOnInit() {
    super.ngOnInit();
    this.input = input;
  }

  costs: number[] = [];
  best = 0;
  worst = 1;
  count = 1;

  async solve(input: string) {
    const crabs = input.split(',').map(toInt);
    this.count = crabs.length;

    const min = Math.min(...crabs);
    const max = Math.max(...crabs);

    const costs: number[] = [...range(min, max)].map((pos) =>
      sum(
        crabs.map((p) => {
          const dist = Math.abs(p - pos);
          return (dist * (dist + 1)) / 2;
        })
      )
    );

    const maxCost = Math.max(...costs);
    this.worst = maxCost;
    this.costs = costs;

    const minCost = Math.min(...costs);
    this.best = minCost;

    return `${minCost}`;
  }
}
