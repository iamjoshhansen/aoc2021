export function clamp(x: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, x));
}
