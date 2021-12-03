export function textToArrayOfNumbers(input: string): number[] {
  return input
    .trim()
    .split('\n')
    .map(line => parseInt(line, 10));
}
