import { Component, OnInit } from '@angular/core';
import { day10InputA as input } from 'src/app/days/day10/day10-input';

import { Star } from '../../star/star';

const code: {
  open: string;
  close: string;
  error: number;
  success: number;
}[] = [
  {
    open: '(',
    close: ')',
    error: 3,
    success: 1,
  },
  {
    open: '[',
    close: ']',
    error: 57,
    success: 2,
  },
  {
    open: '{',
    close: '}',
    error: 1197,
    success: 3,
  },
  {
    open: '<',
    close: '>',
    error: 25137,
    success: 4,
  },
];

const commandPair = new Map(code.map((c) => [c.open, c.close]));
const commandError = new Map(code.map((c) => [c.close, c.error]));
const completionValue = new Map(code.map((c) => [c.close, c.success]));

function isOpener(command: string): boolean {
  return commandPair.has(command);
}

enum Status {
  complete = 'complete',
  incomplete = 'incomplete',
  error = 'error',
}

class SyntaxLine {
  constructor(public readonly line: string) {}

  run(): {
    status: Status;
    error?: number;
    completion?: number;
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
            status: Status.error,
            error: commandError.get(c),
          };
        }
      }
    }

    if (stack.length === 0) {
      return {
        status: Status.complete,
      };
    }

    const completion = stack
      .reverse()
      .map((c) => completionValue.get(c)!)
      .reduce((a, c) => a * 5 + c, 0);

    console.log(stack.join(''), completion);

    return {
      status: Status.incomplete,
      completion,
    };
  }
}

@Component({
  selector: 'app-day10-part2',
  templateUrl: './day10-part2.component.html',
  styleUrls: ['./day10-part2.component.scss'],
})
export class Day10Part2Component extends Star implements OnInit {
  override ngOnInit() {
    super.ngOnInit();
    this.input = input;
  }

  async solve(input: string) {
    const rows = input.split('\n');

    const commandLines = rows.map((row) => new SyntaxLine(row));

    let incompletionValues: number[] = [];

    commandLines.forEach((line) => {
      const result = line.run();
      if (result.status === Status.incomplete) {
        incompletionValues.push(result.completion!);
      }
    });

    incompletionValues.sort((a, b) => a - b);

    console.log(incompletionValues);

    return `${incompletionValues[Math.floor(incompletionValues.length / 2)]}`;
  }
}
