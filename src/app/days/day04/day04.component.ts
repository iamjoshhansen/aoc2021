import { Component, OnInit } from '@angular/core';

import { Star } from '../../star/star';
import { day4InputExample as input } from 'src/app/days/day04/day4-input';
import { sum } from 'src/app/utils';

class BingoBoard {
  private readonly marked = new Set<number>();
  public readonly grid: number[][];
  public readonly width: number;
  public readonly height: number;

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
  selector: 'app-day04',
  templateUrl: './day04.component.html',
  styleUrls: ['./day04.component.scss'],
})
export class Day04Component extends Star implements OnInit {
  override ngOnInit() {
    super.ngOnInit();
    this.input = input;
  }

  boards: BingoBoard[] = [];
  marked: number[] = [];

  async solve(input: string) {
    const rows = input.split('\n');

    // get the first row, split by comma, parse into numbers
    const callouts = rows
      .shift()!
      .split(',')
      .map((s) => parseInt(s, 10));

    // recreate lines, trim, then split by double newline
    const boardsText = rows.join('\n').trim().split('\n\n');

    const boards: BingoBoard[] = boardsText.map((text) => new BingoBoard(text));
    this.boards = boards;

    // Play Bingo!!

    let calloutCursor = -1;
    const calloutLength = callouts.length;

    let winners: BingoBoard[] = [];
    while (winners.length === 0 && ++calloutCursor < calloutLength) {
      const callout = callouts[calloutCursor];
      boards.forEach((board) => {
        this.marked.push(callout);
        board.mark(callout);
        if (board.hasWon) {
          winners.push(board);
        }
      });
    }

    const winningCallout = callouts[calloutCursor];
    const winner = winners[0];
    const sumOfWinnersUnmarked = sum(winner.umarkedNumers);

    return `${sumOfWinnersUnmarked} * ${winningCallout} = ${
      winningCallout * sumOfWinnersUnmarked
    }`;
  }
}
