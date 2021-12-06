import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { day6InputExample as input } from 'src/app/days/day06/day6-input';

import { Star } from 'src/app/star/star';
import { range } from 'src/app/utils/range';
import { toInt } from 'src/app/utils/to-int';

class LanternFish {
  constructor(
    public timer: number,
    public readonly cycle = 7,
    public readonly initialDelay = 2
  ) {}

  update(): LanternFish | void {
    this.timer--;
    if (this.timer === -1) {
      this.timer = this.cycle - 1;
      return new LanternFish(
        this.cycle + this.initialDelay - 1,
        this.cycle,
        this.initialDelay
      );
    }
  }

  toString() {
    return `${this.timer}`;
  }
}

@Component({
  selector: 'app-day06',
  templateUrl: './day06.component.html',
  styleUrls: ['./day06.component.scss'],
})
export class Day06Component extends Star implements AfterViewInit, OnInit {
  override ngOnInit() {
    super.ngOnInit();
    this.input = input;
  }

  @ViewChild('canvas') private canvasRef!: ElementRef;
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  day = 0;

  constructor(readonly elementRef: ElementRef) {
    super();
  }

  ngAfterViewInit() {
    this.canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.animate();
  }

  async solve(input: string) {
    const rows = input.split('\n');
    const timers = rows[0].split(',').map(toInt);

    const lanternFish: LanternFish[] = timers.map(
      (timer) => new LanternFish(timer)
    );

    // console.log(`Initial state: ${lanternFish.join(',')}`);

    for (let i = 0; i < 80; i++) {
      const newFish: LanternFish[] = [];
      lanternFish.forEach((fish) => {
        const spawn = fish.update();
        if (spawn) {
          newFish.push(spawn);
        }
      });
      newFish.forEach((fish) => lanternFish.push(fish));
      // console.log(
      //   `After ${(i + 1).toString().padStart(2)} days: ${lanternFish.join(',')}`
      // );
    }

    // console.log(`After 80 days: ${lanternFish.join(',')}`);

    return `${lanternFish.length}`;
  }

  private drawFish(count: number) {
    this.canvas.width = this.canvas.parentElement!.clientWidth;
    this.canvas.height = this.canvas.parentElement!.clientHeight;
    this.ctx = this.canvas.getContext('2d')!;

    for (let i = 0; i < count; i++) {
      this.drawOneFish();
    }
  }

  private drawOneFish() {
    const width = this.canvas.parentElement!.clientWidth;
    const height = this.canvas.parentElement!.clientHeight;
    const position = {
      x: Math.random() * width,
      y: Math.random() * height,
    };
    const ctx = this.ctx;

    const noseX = 10;
    const finX = -10;
    const bodyX = 5;
    const bodyHeight = 4;
    const finHeight = 3;

    ctx.save();
    ctx.translate(position.x, position.y);
    if (Math.random() < 0.5) {
      ctx.rotate(Math.PI);
    }
    const scale = 0.9 + Math.random() * 0.2;
    ctx.scale(scale, scale);
    ctx.beginPath();
    ctx.moveTo(noseX, 0);
    ctx.lineTo(bodyX, bodyHeight);
    ctx.lineTo(finX, -finHeight);
    ctx.lineTo(finX, finHeight);
    ctx.lineTo(bodyX, -bodyHeight);
    ctx.closePath();
    ctx.fillStyle = `#ccccffcc`;
    ctx.fill();

    ctx.strokeStyle = `#fff`;
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';
    ctx.stroke();

    ctx.restore();
  }

  private async animate() {
    const rows = input.split('\n');
    const timers = rows[0].split(',').map(toInt);

    const lanternFish: LanternFish[] = timers.map(
      (timer) => new LanternFish(timer)
    );

    this.drawFish(lanternFish.length);

    for (let i of range(0, 80)) {
      this.day = i;
      await new Promise((resolve) => setTimeout(resolve, 1000 / 30));

      const newFish: LanternFish[] = [];
      lanternFish.forEach((fish) => {
        const spawn = fish.update();
        if (spawn) {
          newFish.push(spawn);
        }
      });
      newFish.forEach((fish) => {
        lanternFish.push(fish);
        this.drawOneFish();
      });
    }
  }
}
