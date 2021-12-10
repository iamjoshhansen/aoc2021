export function difference<T>(a: T[], b: T[]): T[] {
  return a.filter((c) => !b.includes(c));
}

export function diffString(a: string, b: string): string {
  return difference(a.split(''), b.split('')).join('');
}
