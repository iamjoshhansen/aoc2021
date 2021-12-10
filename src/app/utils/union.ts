export function union<T>(items: T[][]): T[] {
  let res = items[0];
  for (let i = 1; i < items.length; i++) {
    res = res.filter((c) => items[i].includes(c));
  }
  return res;
}

export function strUnion(items: string[]): string {
  return union(items.map((item) => item.split(''))).join('');
}
