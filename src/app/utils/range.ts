export function* range(min: number, max: number) {
  const step = max > min ? 1 : -1;
  const count = Math.abs(max - min);
  for (let i = 0; i < count; i++) {
    yield min + i * step;
  }
  yield max;
}
