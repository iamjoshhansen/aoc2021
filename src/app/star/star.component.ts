import { Component, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss'],
})
export class StarComponent {
  private inputSubject = new BehaviorSubject<string>('');
  @Output() readonly inputChange = this.inputSubject.pipe(
    filter((x) => x.length > 0),
    distinctUntilChanged()
  );
  get input() {
    return this.inputSubject.value;
  }
  @Input() set input(val: string) {
    this.inputSubject.next(val);
  }

  // @Input() input = '';
  @Input() result?: any;
  @Input() day = 0;
  @Input() isPart2 = false;

  private solveTimeSubject = new BehaviorSubject<number | null>(null);
  readonly solveTimeObservable = this.solveTimeSubject.pipe(
    filter((x) => x !== null),
    distinctUntilChanged()
  );
  @Input() set solveTime(val: number | null) {
    this.solveTimeSubject.next(val);
  }
  get solveTime() {
    return this.solveTimeSubject.value;
  }
}
