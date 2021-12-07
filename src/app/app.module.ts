import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Day01Part2Component } from './days/day01-part2/day01-part2.component';
import { Day01Component } from './days/day01/day01.component';
import { Day02Part2Component } from './days/day02-part2/day02-part2.component';
import { Day02Component } from './days/day02/day02.component';
import { Day03Part2Component } from './days/day03-part2/day03-part2.component';
import { Day03Component } from './days/day03/day03.component';
import { StarComponent } from './star/star.component';
import { Day04Component } from './days/day04/day04.component';
import { Day04Part2Component } from './days/day04-part2/day04-part2.component';
import { Day05Component } from './days/day05/day05.component';
import { Day05Part2Component } from './days/day05-part2/day05-part2.component';
import { Day06Component } from './days/day06/day06.component';
import { Day06Part2Component } from './days/day06-part2/day06-part2.component';
import { Day07Component } from './days/day07/day07.component';
import { Day07Part2Component } from './days/day07-part2/day07-part2.component';

@NgModule({
  declarations: [
    AppComponent,
    StarComponent,
    Day01Component,
    Day01Part2Component,
    Day02Component,
    Day02Part2Component,
    Day03Component,
    Day03Part2Component,
    Day04Component,
    Day04Part2Component,
    Day05Component,
    Day05Part2Component,
    Day06Component,
    Day06Part2Component,
    Day07Component,
    Day07Part2Component,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
