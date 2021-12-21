import { Component, OnInit } from '@angular/core';
import { day14InputA as input } from 'src/app/days/day14/day14-input';

import { Star } from 'src/app/star/star';
import { sum } from 'src/app/utils';

type Rules = Map<string, string>;

type CharCount = Record<string, number>;

function mergeCharCounts(a: CharCount, b: CharCount) {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  const allKeys = new Set<string>([...aKeys, ...bKeys]);
  allKeys.forEach((key) => {
    a[key] = (a[key] ?? 0) + (b[key] ?? 0);
  });
}

const cache = new Map<string, CharCount>();
function getCacheKey(level: number, a: string, b: string) {
  return `${level}:${a}${b}`;
}

function* insertion(
  a: string,
  b: string,
  rules: Rules,
  iterationCount: number
): Generator<CharCount> {
  const cacheKey = getCacheKey(iterationCount, a, b);
  const cachedVal = cache.get(cacheKey);
  if (cachedVal) {
    // console.log(`Retrieved ${cacheKey}`);
    yield cachedVal;
  } else {
    const insert = rules.get(`${a}${b}`)!;

    const selfCount = {
      [insert]: 1,
    };

    if (iterationCount === 0) {
      yield selfCount;
      // console.log(`Saving ${cacheKey}`);
      cache.set(cacheKey, selfCount);
    } else {
      const counts: CharCount = {};

      // left
      for (let i of insertion(a, insert, rules, iterationCount - 1)) {
        mergeCharCounts(counts, i);
        yield i;
      }

      // self
      mergeCharCounts(counts, selfCount);
      yield selfCount;

      // right
      for (let i of insertion(insert, b, rules, iterationCount - 1)) {
        mergeCharCounts(counts, i);
        yield i;
      }

      // console.log(`Saving ${cacheKey}`);
      cache.set(cacheKey, counts);
      // cache.set(cacheKey, selfCount);
    }
  }
}

function* polymerGrower(
  template: string,
  rules: Rules,
  iterationCount: number
): Generator<CharCount> {
  let polymer = template.split('');

  while (polymer.length > 1) {
    const a = polymer.shift()!;
    const b = polymer[0];
    console.log(polymer.length);

    yield { [a]: 1 };
    if (iterationCount > 1) {
      for (let i of insertion(a, b, rules, iterationCount - 1)) {
        yield i;
      }
    }
  }

  const end = polymer.pop()!;
  yield { [end]: 1 };
  console.log(`Done!`);
}

// function* insertion(
//   a: string,
//   b: string,
//   rules: Rules,
//   iterationCount: number
// ): Generator<string> {
//   const insert = rules.get(`${a}${b}`)!;
//   if (iterationCount === 0) {
//     yield insert;
//   } else {
//     for (let i of insertion(a, insert, rules, iterationCount - 1)) {
//       yield i;
//     }
//     yield insert;
//     for (let i of insertion(insert, b, rules, iterationCount - 1)) {
//       yield i;
//     }
//   }
// }

// function* polymerGrower(
//   template: string,
//   rules: Rules,
//   iterationCount: number
// ): Generator<string> {
//   let polymer = template.split('');

//   while (polymer.length > 1) {
//     const a = polymer.shift()!;
//     const b = polymer[0];
//     console.log(polymer.length);

//     yield a;
//     if (iterationCount > 1) {
//       for (let i of insertion(a, b, rules, iterationCount - 1)) {
//         yield i;
//       }
//     }
//   }

//   const end = polymer.pop()!;
//   yield end;
//   console.log(`Done!`);
// }

// class Counter<T> {
//   private counts = new Map<T, number>();

//   get least() {
//     return Math.min(...this.counts.values());
//   }

//   get most() {
//     return Math.max(...this.counts.values());
//   }

//   constructor() {}

//   add(item: T) {
//     this.counts.set(item, (this.counts.get(item) ?? 0) + 1);
//   }
// }

@Component({
  selector: 'app-day14-part2',
  templateUrl: './day14-part2.component.html',
  styleUrls: ['./day14-part2.component.scss'],
})
export class Day14Part2Component extends Star implements OnInit {
  override ngOnInit() {
    super.ngOnInit();
    this.input = input;
  }

  startingPolymer = '';
  iterations = 40;
  size = 0;
  counts: CharCount = {};
  // polymer = '';
  cache = {};

  async solve(input: string) {
    const [templates, rulePairDesc] = input
      .split('\n\n')
      .map((section) => section.split('\n'));

    const start = new Date().getTime();

    const template = templates[0];
    this.startingPolymer = template;
    const pairs = rulePairDesc.map((pair) => pair.split(' -> ')) as [
      string,
      string
    ][];
    const rules = new Map<string, string>(pairs);

    const grower = polymerGrower(template, rules, this.iterations);
    // const counter = new Counter<string>();
    const counts: CharCount = {};

    for (let c of grower) {
      // console.log(c);
      mergeCharCounts(counts, c);
      this.size = sum(Object.values(counts));
      this.counts = counts;
      await new Promise((resolve) => setTimeout(resolve, 0));
      // this.polymer += c;
    }

    const values = Object.values(counts);
    const most = Math.max(...values);
    const least = Math.min(...values);
    const delta = most - least;

    const end = new Date().getTime();
    const duration = end - start;
    console.log(`Duration ${duration}ms`);

    return `${most} - ${least} = ${delta}`;
  }
}
