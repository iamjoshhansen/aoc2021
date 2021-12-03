import { Component, OnInit } from '@angular/core';
import { day3InputExample as input } from 'src/app/days/day03/day3-input';

import { Star } from '../../star/star';

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
    const rows = input.split('\n');

    return `coming soon`;
  }
}
