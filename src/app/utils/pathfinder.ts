import { Grid2D, Position } from '.';

export class Explorer {
  nextSteps(signs: Map<string, Explorer>, sourceId: string) {
    return this.riskGrid
      .neighborPositionsFromSides(this.position)
      .filter((pos) => {
        const posId = Explorer.id(pos);
        if (sourceId === posId) {
          return false;
        }
        const risk = this.riskGrid.getValue(pos)!;
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
    public readonly riskGrid: Grid2D<number>,
    public readonly position: Position,
    public readonly totalRisk = 0,
    public readonly origin?: Position
  ) {}
}

export class Pathfinder {
  constructor(private readonly riskGrid: Grid2D<number>) {}

  getTotalRisks(start: Position, end: Position) {
    const explorers = new Set<Explorer>([new Explorer(this.riskGrid, start)]);
    const signs = new Map<string, Explorer>();

    let foundTarget = false;
    const targetPosId = Explorer.id(end);
    const sourceId = Explorer.id(start);
    while (explorers.size > 0 && !foundTarget) {
      const bestExplorer = [...explorers].sort(
        (a, b) => a.totalRisk - b.totalRisk
      )[0];
      explorers.delete(bestExplorer);
      for (const next of bestExplorer.nextSteps(signs, sourceId)) {
        const nextTotalRisk =
          bestExplorer.totalRisk + this.riskGrid.getValue(next)!;
        const newExp = new Explorer(
          this.riskGrid,
          next,
          nextTotalRisk,
          bestExplorer.position
        );
        signs.set(newExp.id, newExp);
        // drawCell(next);
        explorers.add(newExp);
        if (newExp.id === targetPosId) {
          foundTarget = true;
        }
      }
    }

    return signs;
  }

  getPath(explorer: Position, explorers: Map<string, Explorer>) {
    const path: Position[] = [];
    let cursor: Position | null = explorer;
    while (cursor) {
      // console.log(cursor);
      path.push(cursor);
      const cursorId: string = Explorer.id(cursor);
      cursor = explorers.get(cursorId)?.origin || null;
    }
    path.reverse();
    return path;
  }

  totalRisk(path: Position[]) {
    return path.reduce((a, c) => a + (this.riskGrid.getValue(c) ?? 0), 0);
  }
}
