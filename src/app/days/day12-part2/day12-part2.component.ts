import { Component, OnInit } from '@angular/core';
import { day12InputA as input } from 'src/app/days/day12/day12-input';

import { Star } from 'src/app/star/star';
import { Graph } from 'src/app/utils/graph';

function lastItem<T>(array: T[]): T {
  return array[array.length - 1];
}

type PathValidator<T> = (path: T[]) => boolean;

function find<T>(
  graph: Graph<T>,
  path: T[],
  target: T,
  pathValidator: PathValidator<T>,
  paths: T[][]
) {
  const last = lastItem(path);
  const pathLength = path.length;
  const nexts = (graph.getConnections(last) || [])
    // avoid infinte loops
    // .filter((next) => {
    //   let i = 0;
    //   while (++i < pathLength) {
    //     if (path[i - 1] === last && path[i] === next) {
    //       return false;
    //     }
    //   }
    //   return true;
    // })
    .sort();
  // don't visit the same "small" cave twice
  // .filter((next) => !(next === next.toLowerCase() && path.includes(next)))

  nexts.forEach((next) => {
    const nextPath = path.concat(next);

    const isValid = pathValidator(nextPath);

    if (isValid) {
      if (next === target) {
        paths.push(nextPath);
      } else {
        find(graph, nextPath, target, pathValidator, paths);
      }
    }
  });
}

function findAllPaths<T>(
  graph: Graph<T>,
  start: T,
  end: T,
  pathValidator: PathValidator<T>
) {
  const paths: T[][] = [];
  find(graph, [start], end, pathValidator, paths);
  return paths;
}

@Component({
  selector: 'app-day12-part2',
  templateUrl: './day12-part2.component.html',
  styleUrls: ['./day12-part2.component.scss'],
})
export class Day12Part2Component extends Star implements OnInit {
  override ngOnInit() {
    super.ngOnInit();
    this.input = input;
  }

  async solve(input: string) {
    const rows = input.split('\n');
    const graph = new Graph<string>();

    rows.forEach((row) => {
      const [a, b] = row.split('-');
      graph.addNode(a);
      graph.addNode(b);
      graph.connectNode(a, b);
      graph.connectNode(b, a);
    });

    const paths = findAllPaths(graph, 'start', 'end', (path) => {
      // console.log(`Testing: ${path.join(',')}`);
      const smallCaveVisitCounts: Record<string, number> = {};
      let i = -1;
      while (++i < path.length) {
        const cave = path[i];
        if (cave === 'start' && i > 0) {
          return false;
        }

        if (cave.toLowerCase() === cave) {
          smallCaveVisitCounts[cave] = (smallCaveVisitCounts[cave] ?? 0) + 1;
          const visitCounts = Object.values(smallCaveVisitCounts).sort(
            (a, b) => b - a
          );
          if (
            visitCounts.length > 1 &&
            (visitCounts[1] > 1 || visitCounts[0] > 2)
          ) {
            return false;
          }
        }
      }
      return true;
    });

    // paths.forEach((path) => console.log(path.join(',')));

    return `${paths.length}`;
  }
}
