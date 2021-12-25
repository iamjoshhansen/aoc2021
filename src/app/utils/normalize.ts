export function normalize(
  x: number,
  min: number,
  max: number,
  newMin = 0,
  newMax = 1
) {
  const normalized = (x - min) / (max - min);
  return newMin + normalized * (newMax - newMin);
}
