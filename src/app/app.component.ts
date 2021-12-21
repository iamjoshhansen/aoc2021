import { Component } from '@angular/core';
import { range } from './utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  days = [...range(1, 14)];
}
