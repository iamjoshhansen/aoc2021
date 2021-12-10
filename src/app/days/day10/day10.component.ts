import { Component, OnInit } from '@angular/core';
import { day10InputA as input } from 'src/app/days/day10/day10-input';
import { Star } from 'src/app/star/star';
import { sum } from 'src/app/utils';

const code: {
  open: string;
  close: string;
  error: number;
}[] = [
  {
    open: '(',
    close: ')',
    error: 3,
  },
  {
    open: '[',
    close: ']',
    error: 57,
  },
  {
    open: '{',
    close: '}',
    error: 1197,
  },
  {
    open: '<',
    close: '>',
    error: 25137,
  },
];

const commandPair = new Map(code.map((c) => [c.open, c.close]));
const commandError = new Map(code.map((c) => [c.close, c.error]));

function isOpener(command: string): boolean {
  return commandPair.has(command);
}

class SyntaxLine {
  constructor(public readonly line: string) {}

  run(): {
    complete: boolean;
    error?: number;
  } {
    const stack: string[] = [];
    const count = this.line.length;

    let i = -1;
    while (++i < count) {
      const c = this.line[i];
      if (isOpener(c)) {
        stack.push(commandPair.get(c)!);
      } else {
        const expected = stack.pop();
        if (c !== expected) {
          return {
            complete: false,
            error: commandError.get(c),
          };
        }
      }
    }

    return {
      complete: stack.length === 0,
    };
  }
}

@Component({
  selector: 'app-day10',
  templateUrl: './day10.component.html',
  styleUrls: ['./day10.component.scss'],
})
export class Day10Component extends Star implements OnInit {
  override ngOnInit() {
    super.ngOnInit();
    this.input = input;
  }

  async solve(input: string) {
    const rows = input.split('\n');

    const commandLines = rows.map((row) => new SyntaxLine(row));

    let errorCodes: number[] = [];

    commandLines.forEach((line) => {
      const result = line.run();
      if (typeof result.error !== 'undefined') {
        errorCodes.push(result.error);
      }
    });

    return `${sum(errorCodes)}`;
  }
}
