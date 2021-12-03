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
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
