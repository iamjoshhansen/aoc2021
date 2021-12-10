export function multiply(numbers: number[]): number {
  return numbers.reduce((a, c) => a * c, 1);
}
