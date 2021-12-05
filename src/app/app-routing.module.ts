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
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
