import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Day01Part2Component } from './days/day01-part2/day01-part2.component';
import { Day01Component } from './days/day01/day01.component';
import { Day02Part2Component } from './days/day02-part2/day02-part2.component';
import { Day02Component } from './days/day02/day02.component';
import { Day03Part2Component } from './days/day03-part2/day03-part2.component';
import { Day03Component } from './days/day03/day03.component';
import { Day04Part2Component } from './days/day04-part2/day04-part2.component';
import { Day04Component } from './days/day04/day04.component';
import { Day05Part2Component } from './days/day05-part2/day05-part2.component';
import { Day05Component } from './days/day05/day05.component';
import { Day06Part2Component } from './days/day06-part2/day06-part2.component';
import { Day06Component } from './days/day06/day06.component';
import { Day07Part2Component } from './days/day07-part2/day07-part2.component';
import { Day07Component } from './days/day07/day07.component';
import { Day08Part2Component } from './days/day08-part2/day08-part2.component';
import { Day08Component } from './days/day08/day08.component';
import { Day09Part2Component } from './days/day09-part2/day09-part2.component';
import { Day09Component } from './days/day09/day09.component';
import { Day10Part2Component } from './days/day10-part2/day10-part2.component';
import { Day10Component } from './days/day10/day10.component';
import { Day11Part2Component } from './days/day11-part2/day11-part2.component';
import { Day11Component } from './days/day11/day11.component';
import { Day12Part2Component } from './days/day12-part2/day12-part2.component';
import { Day12Component } from './days/day12/day12.component';
import { Day13Part2Component } from './days/day13-part2/day13-part2.component';
import { Day13Component } from './days/day13/day13.component';
import { Day14Part2Component } from './days/day14-part2/day14-part2.component';
import { Day14Component } from './days/day14/day14.component';
import { Day15Part2Component } from './days/day15-part2/day15-part2.component';
import { Day15Component } from './days/day15/day15.component';

const routes: Routes = [
  {
    path: 'day-01',
    component: Day01Component,
  },
  {
    path: 'day-01-part-2',
    component: Day01Part2Component,
  },
  {
    path: 'day-02',
    component: Day02Component,
  },
  {
    path: 'day-02-part-2',
    component: Day02Part2Component,
  },
  {
    path: 'day-03',
    component: Day03Component,
  },
  {
    path: 'day-03-part-2',
    component: Day03Part2Component,
  },
  {
    path: 'day-04',
    component: Day04Component,
  },
  {
    path: 'day-04-part-2',
    component: Day04Part2Component,
  },
  {
    path: 'day-05',
    component: Day05Component,
  },
  {
    path: 'day-05-part-2',
    component: Day05Part2Component,
  },
  {
    path: 'day-06',
    component: Day06Component,
  },
  {
    path: 'day-06-part-2',
    component: Day06Part2Component,
  },
  {
    path: 'day-07',
    component: Day07Component,
  },
  {
    path: 'day-07-part-2',
    component: Day07Part2Component,
  },
  {
    path: 'day-08',
    component: Day08Component,
  },
  {
    path: 'day-08-part-2',
    component: Day08Part2Component,
  },
  {
    path: 'day-09',
    component: Day09Component,
  },
  {
    path: 'day-09-part-2',
    component: Day09Part2Component,
  },
  {
    path: 'day-10',
    component: Day10Component,
  },
  {
    path: 'day-10-part-2',
    component: Day10Part2Component,
  },
  {
    path: 'day-11',
    component: Day11Component,
  },
  {
    path: 'day-11-part-2',
    component: Day11Part2Component,
  },
  {
    path: 'day-12',
    component: Day12Component,
  },
  {
    path: 'day-12-part-2',
    component: Day12Part2Component,
  },
  {
    path: 'day-13',
    component: Day13Component,
  },
  {
    path: 'day-13-part-2',
    component: Day13Part2Component,
  },
  {
    path: 'day-14',
    component: Day14Component,
  },
  {
    path: 'day-14-part-2',
    component: Day14Part2Component,
  },
  {
    path: 'day-15',
    component: Day15Component,
  },
  {
    path: 'day-15-part-2',
    component: Day15Part2Component,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
