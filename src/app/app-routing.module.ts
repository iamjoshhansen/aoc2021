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
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
