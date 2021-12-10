import { Component, OnInit } from '@angular/core';
import { day8InputExample as input } from 'src/app/days/day08/day8-input';
import { Star } from 'src/app/star/star';

@Component({
  selector: 'app-day08',
  templateUrl: './day08.component.html',
  styleUrls: ['./day08.component.scss'],
})
export class Day08Component extends Star implements OnInit {
  override ngOnInit() {
    super.ngOnInit();
    this.input = input;
  }

  async solve(input: string) {
    const lines = input.split('\n');

    let count = 0;
    lines.forEach((line) => {
      const output = line
        .split('|')
        .map((side) => side.trim())
        .pop()!;
      const outputs = output.split(' ').filter((x) => x.length > 0);
      outputs.forEach((out) => {
        const len = out.length;
        if ([2, 3, 4, 7].includes(len)) {
          count++;
        }
      });
    });

    return `${count}`;
  }
}
