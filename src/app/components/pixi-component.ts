import { Component, ElementRef, HostListener, NgZone } from '@angular/core';
import { Application, Text, TextStyle } from 'pixi.js';
import { Subject } from 'rxjs';
import { Point } from './point';

export interface ApplicationOptions {
  autoStart?: boolean;
  width?: number;
  height?: number;
  view?: HTMLCanvasElement;
  transparent?: boolean;
  autoDensity?: boolean;
  antialias?: boolean;
  preserveDrawingBuffer?: boolean;
  resolution?: number;
  forceCanvas?: boolean;
  backgroundColor?: number;
  clearBeforeRender?: boolean;
  forceFXAA?: boolean;
  powerPreference?: string;
  sharedTicker?: boolean;
  sharedLoader?: boolean;
  resizeTo?: Window | HTMLElement;
}

@Component({
  // selector: 'app-pixi',
  template: '',
})
export class PixiComponent {
  readonly destroyed = new Subject<void>();
  app!: Application;
  readonly devicePixelRatio = window.devicePixelRatio || 1;
  readonly applicationOptions: any = { antialias: false };
  readonly center = new Point();
  readonly mouse = new Point();

  protected showFpsTracker = true;
  private fpsTracker!: Text;

  protected keyPressed = new Set<string>();

  constructor(readonly elementRef: ElementRef, protected ngZone: NgZone) {}

  ngOnInit(): void {
    this.initPixi();
  }

  ngOnDestroy(): void {
    this.app.destroy();
    this.destroyed.next();
  }

  private initPixi() {
    console.log('initPixi');
    this.ngZone.runOutsideAngular(() => {
      // @ts-ignore
      this.app = new Application(this.applicationOptions);
      this.app.stage.sortableChildren = true;

      const style = new TextStyle({
        fontFamily: 'Courier New',
        fontSize: 24,
        fill: ['#fff', '#eee'], // gradient
        stroke: '#333',
        strokeThickness: 2,
        // dropShadow: true,
        // dropShadowColor: '#000000',
        // dropShadowBlur: 4,
        // dropShadowAngle: Math.PI / 6,
        // dropShadowDistance: 6,
        // wordWrap: true,
        // wordWrapWidth: 440,
        // lineJoin: 'round'
      });
      this.fpsTracker = new Text(this.app.ticker.FPS.toString(), style);
      const fps = this.fpsTracker;
      fps.zIndex = 100000;
      this.app.stage.addChild(fps);
      fps.visible = this.showFpsTracker;

      this.app.ticker.add(() => {
        fps.visible = this.showFpsTracker;
        fps.text = Math.round(this.app.ticker.FPS).toString();
      });
    });

    const nativeElement: HTMLDivElement = this.elementRef.nativeElement;

    nativeElement.appendChild(this.app.view);

    nativeElement.onmousemove = (ev) => {
      this.mouse.x = ev.offsetX;
      this.mouse.y = ev.offsetY;
    };

    nativeElement.onmousedown = (ev) => this.onMouseDown(ev);
    nativeElement.onmouseup = (ev) => this.onMouseUp(ev);

    document.addEventListener('keydown', (ev) => this.keyPressed.add(ev.key));
    document.addEventListener('keyup', (ev) => this.keyPressed.delete(ev.key));

    this.resize();
  }

  @HostListener('window:resize')
  private resize() {
    const width = this.elementRef.nativeElement.offsetWidth;
    const height = this.elementRef.nativeElement.offsetHeight;
    this.center.set({
      x: width / 2,
      y: height / 2,
    });
    this.mouse.set(this.center);
    const viewportScale = 1 / this.devicePixelRatio;
    this.app.renderer.resize(
      width * this.devicePixelRatio,
      height * this.devicePixelRatio
    );
    this.app.view.style.transform = `scale(${viewportScale})`;
    this.app.view.style.transformOrigin = `top left`;

    this.fpsTracker.x = 0;
    this.fpsTracker.y = 0; // height - 32;
  }

  protected async load(name: string, path: string) {
    return new Promise<void>((resolve) => {
      this.app.loader.add(name, `assets/${path}`).load(() => {
        resolve();
      });
    });
  }

  onMouseDown(ev?: MouseEvent) {
    //
  }

  onMouseUp(ev?: MouseEvent) {
    //
  }
}
