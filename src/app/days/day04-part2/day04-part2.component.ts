import { Component, OnInit } from '@angular/core';
import { day4InputExample as input } from 'src/app/days/day04/day4-input';
import { sum } from 'src/app/utils/sum';

import { Star } from '../../star/star';

class BingoBoard {
  private readonly marked = new Set<number>();
  private readonly grid: number[][];
  private readonly width: number;
  private readonly height: number;

  constructor(public readonly textGrid: string) {
    this.grid = textGrid.split('\n').map((line) =>
      line
        .split(' ')
        .filter((item) => item.length > 0)
        .map((s) => parseInt(s, 10))
    );
    this.width = this.grid[0].length;
    this.height = this.grid.length;
  }

  get hasWon() {
    // check columns for a win
    for (let i = 0; i < this.width; i++) {
      if (this.columnMarkedCount(i) === this.height) {
        return true;
      }
    }

    // check rows for a win
    for (let i = 0; i < this.height; i++) {
      if (this.rowMarkedCount(i) === this.width) {
        return true;
      }
    }

    return false;
  }

  get umarkedNumers(): number[] {
    const unmarked: number[] = [];
    this.grid.forEach((row) =>
      row.forEach((num) => {
        if (!this.marked.has(num)) {
          unmarked.push(num);
        }
      })
    );
    return unmarked;
  }

  private columnMarkedCount(col: number): number {
    return this.grid.map((row) => this.marked.has(row[col])).filter((x) => !!x)
      .length;
  }

  private rowMarkedCount(row: number): number {
    return this.grid[row].filter((x) => this.marked.has(x)).length;
  }

  mark(n: number) {
    this.marked.add(n);
  }
}

@Component({
  selector: 'app-day04-part2',
  templateUrl: './day04-part2.component.html',
  styleUrls: ['./day04-part2.component.scss'],
})
export class Day04Part2Component extends Star implements OnInit {
  override ngOnInit() {
    super.ngOnInit();
    this.input = input;
  }

  async solve(input: string) {
    const rows = input.split('\n');

    // get the first row, split by comma, parse into numbers
    const callouts = rows
      .shift()!
      .split(',')
      .map((s) => parseInt(s, 10));

    // recreate lines, trim, then split by double newline
    const boardsText = rows.join('\n').trim().split('\n\n');

    const activeBoards = new Set<BingoBoard>(
      boardsText.map((text) => new BingoBoard(text))
    );
    const completeBoards = new Set<BingoBoard>();

    // Play Bingo!!

    let calloutCursor = -1;
    const calloutLength = callouts.length;

    let theBiggestLoser: undefined | BingoBoard;

    while (!theBiggestLoser && ++calloutCursor < calloutLength) {
      const callout = callouts[calloutCursor];
      activeBoards.forEach((board) => {
        board.mark(callout);
        if (board.hasWon) {
          completeBoards.add(board);
          activeBoards.delete(board);
          if (activeBoards.size === 0) {
            theBiggestLoser = board;
          }
        }
      });
    }

    if (!theBiggestLoser) {
      throw new Error('There is no loser');
    }

    const winningCallout = callouts[calloutCursor];
    const sumOfWinnersUnmarked = sum(theBiggestLoser.umarkedNumers);

    return `${sumOfWinnersUnmarked} * ${winningCallout} = ${
      winningCallout * sumOfWinnersUnmarked
    }`;
  }
}
