import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { day15InputExample as input } from 'src/app/days/day15/day15-input';
import { Star } from 'src/app/star/star';
import { Grid2D, Position, toInt, normalize, Canvas } from 'src/app/utils';

@Component({
  selector: 'app-day15',
  templateUrl: './day15.component.html',
  styleUrls: ['./day15.component.scss'],
})
export class Day15Component extends Star implements OnInit {
  @ViewChild('canvas') private canvasRef!: ElementRef<HTMLCanvasElement>;
  override ngOnInit() {
    super.ngOnInit();
    this.input = input;
  }

  async solve(input: string) {
    const risks = input.split('\n').map((row) => row.split('').map(toInt));
    const riskGrid = new Grid2D(risks);

    const canvas = new Canvas(this.canvasRef.nativeElement, (size) => ({
      width: Math.floor(size.width / riskGrid.width) * riskGrid.width,
      height: Math.floor(size.height / riskGrid.height) * riskGrid.height,
    }));

    console.log(`filling canvas`);
    canvas.fillBackground(`#fff`);
    const ctx = canvas.ctx;
    const cellWidth = canvas.width / riskGrid.width;
    const cellHeight = canvas.height / riskGrid.height;

    const source = { x: 0, y: 0 };
    const target = { x: riskGrid.width - 1, y: riskGrid.height - 1 };

    // const posId = (position: Position) => `${position.x},${position.y}`;

    // const pathCells: PathCellMap = new Map<string, PathCell>([
    //   [
    //     posId(source),
    //     {
    //       totalRisk: 0,
    //       prevPos: null,
    //     },
    //   ],
    // ]);

    class Explorer {
      nextSteps(signs: Map<string, Explorer>, sourceId: string) {
        return riskGrid
          .neighborPositionsFromSides(this.position)
          .filter((pos) => {
            const posId = Explorer.id(pos);
            if (sourceId === posId) {
              return false;
            }
            const risk = riskGrid.getValue(pos)!;
            const newTotalRisk = this.totalRisk + risk;
            const existingTotalRisk = signs.get(posId)?.totalRisk;
            if (typeof existingTotalRisk !== 'undefined') {
              return existingTotalRisk > newTotalRisk;
            }
            return true;
          });
      }

      get id() {
        return Explorer.id(this.position);
      }

      static id(position: Position) {
        return `${position.x},${position.y}`;
      }

      constructor(
        public readonly position: Position,
        public readonly totalRisk = 0,
        public readonly origin?: Position
      ) {}
    }

    const explorers = new Set<Explorer>([new Explorer(source)]);
    const signs = new Map<string, Explorer>();

    const drawCell = (pos: Position) => {
      const cellRisk = riskGrid.getValue(pos)!;
      const explorer = signs.get(Explorer.id(pos));
      const totalRisk = explorer?.totalRisk;
      const origin = explorer?.origin;

      const hasBeenExplored = typeof totalRisk !== 'undefined';

      ctx.save();
      ctx.translate(pos.x * cellWidth, pos.y * cellHeight);

      // background
      ctx.fillStyle = `rgb(${normalize(cellRisk, 0, 9, 100, 200)},${normalize(
        cellRisk,
        0,
        9,
        256,
        100
      )},${normalize(cellRisk, 0, 9, 150, 50)})`;
      if (hasBeenExplored) {
        ctx.fillRect(0, 0, cellWidth, cellHeight);
      } else {
        ctx.fillRect(1, 1, cellWidth - 1, cellHeight - 1);
      }

      // cell risk
      ctx.fillStyle = '#333';
      ctx.textAlign = 'center';
      const mainFontSize = Math.min(cellWidth, cellHeight) * 0.75;
      ctx.font = `${mainFontSize}px Courier New`;
      ctx.fillText(
        cellRisk.toString(),
        cellWidth / 2,
        cellHeight / 2 + mainFontSize / 3
      );

      // totalRisk
      ctx.textAlign = 'right';
      const totalRiskFontSize = Math.min(cellWidth, cellHeight) * 0.2;
      ctx.font = `${totalRiskFontSize}px Courier New`;
      if (hasBeenExplored) {
        ctx.fillText(
          totalRisk.toString(),
          cellWidth - totalRiskFontSize * 0.25,
          totalRiskFontSize
        );
      }

      // Origin
      // if (origin) {
      //   const delta = [origin.x - pos.x, origin.y - pos.y];

      //   const [dsx, dsy] = delta.map((v) => v * cellWidth * 0.4);
      //   const [dex, dey] = delta.map((v) => v * 0);
      //   ctx.strokeStyle = `#ffffff99`;
      //   ctx.lineJoin = 'round';
      //   ctx.lineCap = 'round';
      //   ctx.lineWidth = Math.max(1, Math.min(cellWidth, cellHeight) * 0.05);
      //   ctx.save();
      //   ctx.translate(cellWidth / 2, cellHeight / 2);
      //   ctx.beginPath();
      //   ctx.moveTo(dsx, dsy);
      //   ctx.lineTo(dex, dey);
      //   ctx.stroke();
      //   ctx.closePath();
      //   ctx.restore();
      // }

      ctx.restore();
    };

    for (const pos of riskGrid.positionGenerator()) {
      drawCell(pos);
    }

    let foundTarget = false;
    const targetPosId = Explorer.id(target);
    const sourceId = Explorer.id(source);
    while (explorers.size > 0 && !foundTarget) {
      const bestExplorer = [...explorers].sort(
        (a, b) => a.totalRisk - b.totalRisk
      )[0];
      explorers.delete(bestExplorer);
      for (const next of bestExplorer.nextSteps(signs, sourceId)) {
        const nextTotalRisk = bestExplorer.totalRisk + riskGrid.getValue(next)!;
        const newExp = new Explorer(next, nextTotalRisk, bestExplorer.position);
        signs.set(newExp.id, newExp);
        drawCell(next);
        explorers.add(newExp);
        if (newExp.id === targetPosId) {
          foundTarget = true;
        }
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 10));

    // Console Log
    // riskGrid.positions2D.forEach((row) => {
    //   console.log(
    //     row
    //       .map((p) => pathCells.get(posId(p))!.totalRisk.toString().padStart(3))
    //       .join(',')
    //   );
    // });

    const getPath = (
      end: Position,
      cells: Map<string, Explorer>
    ): Position[] => {
      const path: Position[] = [];
      let cursor: Position | null = end;
      while (cursor) {
        // console.log(cursor);
        path.push(cursor);
        const cursorId: string = Explorer.id(cursor);
        cursor = cells.get(cursorId)?.origin || null;
      }
      path.reverse();
      return path;
    };

    const path = getPath(target, signs);

    ctx.moveTo((source.x + 0.5) * cellWidth, (source.y + 0.5) * cellHeight);
    path.forEach((cell) => {
      ctx.lineTo((cell.x + 0.5) * cellWidth, (cell.y + 0.5) * cellHeight);
    });
    ctx.strokeStyle = '#ffffffcc';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = Math.max(2, Math.min(cellWidth, cellHeight) * 0.1);
    ctx.stroke();

    // console.log(path);

    // start at target, work backward to get path

    return `${signs.get(Explorer.id(target))?.totalRisk}`;
  }
}
