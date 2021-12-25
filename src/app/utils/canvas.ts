export class Canvas {
  public ctx!: CanvasRenderingContext2D;

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private sizer = (size: { width: number; height: number }) => size
  ) {
    this.init();
    window.onresize = () => {
      this.init();
    };
  }

  init() {
    const size = this.sizer({
      width: this.canvas.parentElement!.clientWidth,
      height: this.canvas.parentElement!.clientHeight,
    });
    this.canvas.width = size.width;
    this.canvas.height = size.height;
    this.ctx = this.canvas.getContext('2d')!;
  }

  fillBackground(color: string | CanvasGradient | CanvasPattern) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  clearBackground() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
