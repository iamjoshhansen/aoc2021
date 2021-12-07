import { Component, OnInit } from '@angular/core';
import { Star } from 'src/app/star/star';
import { day7InputExample as input } from 'src/app/days/day07/day7-input';
import { range, sortBy, sum, toInt } from 'src/app/utils';

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

  async solve(input: string) {
    const crabs = input.split(',').map(toInt);

    const min = Math.min(...crabs);
    const max = Math.max(...crabs);

    const costs: { pos: number; cost: number }[] = [...range(min, max)].map(
      (pos) => ({
        pos,
        cost: sum(
          crabs.map((p) => {
            const dist = Math.abs(p - pos);
            return (dist * (dist + 1)) / 2;
          })
        ),
      })
    );

    sortBy(costs, 'cost');
    const best = costs[0];

    return `${best.cost}`;
  }
}
