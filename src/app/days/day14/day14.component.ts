import { Component, OnInit } from '@angular/core';
import { day14InputA as input } from 'src/app/days/day14/day14-input';
import { Star } from 'src/app/star/star';

function* polymerGrower(template: string, rules: Map<string, string>) {
  let polymer = `${template}`;
  while (true) {
    const insertions: string[] = [];
    const count = polymer.length;
    for (let i = 1; i < count; i++) {
      const pair = `${polymer[i - 1]}${polymer[i]}`;
      const insertion = rules.get(pair);
      if (insertion) {
        insertions.push(insertion);
      }
    }

    polymer = zip(polymer.split(''), insertions).join('');

    yield polymer;
  }
}

function zip<A, B>(a: A[], b: B[]): (A | B)[] {
  const count = a.length;
  const ret = [];
  for (let i = 0; i < count; i++) {
    ret.push(a[i]);
    ret.push(b[i]);
  }
  return ret;
}

function valueCounts<T extends string | number>(
  values: T[]
): Record<T, number> {
  const counts: Record<any, number> = {};
  values.forEach((val) => (counts[val] = (counts[val] ?? 0) + 1));
  return counts;
}

@Component({
  selector: 'app-day14',
  templateUrl: './day14.component.html',
  styleUrls: ['./day14.component.scss'],
})
export class Day14Component extends Star implements OnInit {
  override ngOnInit() {
    super.ngOnInit();
    this.input = input;
  }

  async solve(input: string) {
    const [templates, rulePairDesc] = input
      .split('\n\n')
      .map((section) => section.split('\n'));

    const template = templates[0];
    const pairs = rulePairDesc.map((pair) => pair.split(' -> ')) as [
      string,
      string
    ][];
    const rules = new Map<string, string>(pairs);

    const grower = polymerGrower(template, rules);

    let polymer = '';
    let counts: Record<string, number> = {};
    for (let i = 0; i < 10; i++) {
      polymer = grower.next().value || '';
      counts = valueCounts(polymer.split(''));
    }

    const min = Math.min(...Object.values(counts));
    const max = Math.max(...Object.values(counts));
    const delta = max - min;

    return `${delta}`;
  }
}
