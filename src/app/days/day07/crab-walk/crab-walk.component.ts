import { Component, Input, OnInit } from '@angular/core';
import { Sprite } from 'pixi.js';
import {
  BehaviorSubject,
  distinctUntilChanged,
  Subject,
  takeUntil,
} from 'rxjs';
import {
  PixiComponent,
  ApplicationOptions,
} from 'src/app/components/pixi-component';
import { toInt } from 'src/app/utils';

@Component({
  selector: 'app-crab-walk',
  templateUrl: './crab-walk.component.html',
  styleUrls: ['./crab-walk.component.scss'],
})
export class CrabWalkComponent extends PixiComponent implements OnInit {
  private inputSubject = new BehaviorSubject<string>('');
  readonly inputObservable = this.inputSubject.pipe(distinctUntilChanged());
  @Input() set input(val: string | null) {
    this.inputSubject.next(val || '');
  }
  get input() {
    return this.inputSubject.value;
  }

  crabs: {
    initial: number;
    body: Sprite;
  }[] = [];

  override applicationOptions: ApplicationOptions = {
    ...super.applicationOptions,
    backgroundColor: 0x99ccff,
  };

  override showFpsTracker = false;

  override ngOnInit(): void {
    super.ngOnInit();
    this.app.ticker.add(() => {
      this.crabs.forEach((crab) => {
        crab.body.rotation += 0.01;
      });
    });

    this.inputObservable
      .pipe(takeUntil(this.destroyed))
      .subscribe((input) => this.init(input));
  }

  private async init(input: string) {
    const width = this.app.view.width;
    const height = this.app.view.height;

    // reset
    this.crabs.forEach((crab) => {
      this.app.stage.removeChild(crab.body);
    });
    this.crabs = [];

    const positions = input.split(',').map(toInt);
    const count = positions.length;
    const minPos = Math.min(...positions);
    const maxPos = Math.max(...positions);

    const paddedWidth = width * 0.8;
    const vPad = 10;
    const paddedHeight = height - vPad * 2;

    for (let i = 0; i < count; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const body = Sprite.from('assets/crab.png');
      body.anchor.copyFrom({ x: 0.5, y: 0.5 });
      body.scale.set(2, 2);
      body.position.copyFrom({
        x: 100 + this.center.x + i * 10,
        y: ((i + 1) / (count + 1)) * paddedHeight + vPad,
      });

      this.app.stage.addChild(body);
    }
  }
}
