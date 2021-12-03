import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';

@Component({ template: '' })
export abstract class Star implements OnInit, OnDestroy {
  private destroyed = new Subject<void>();

  private inputSubject = new BehaviorSubject<string>('');
  readonly inputObservable = this.inputSubject.pipe(
    filter(x => x.length > 0),
    debounceTime(100),
    distinctUntilChanged(),
  );
  get input() {
    return this.inputSubject.value;
  }
  set input(val: string) {
    this.inputSubject.next(val);
  }

  private readonly resultSubject = new BehaviorSubject<string>('');
  public readonly result = this.resultSubject.pipe(distinctUntilChanged());

  ngOnInit() {
    console.log(`Init star`);
    this.inputObservable.pipe(takeUntil(this.destroyed)).subscribe(input => this.processInput(input));
  }

  ngOnDestroy() {
    this.destroyed.next();
  }

  async processInput(input: string) {
    this.resultSubject.next(`working...`);
    const result = await this.solve(input);
    this.resultSubject.next(`${result}`);
  }

  abstract solve(input: string): Promise<string>;
}
