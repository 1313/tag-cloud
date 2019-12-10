export function easeInOutCubic(value: number) {
  return value < 0.5
    ? 4 * value * value * value
    : (value - 1) * (2 * value - 2) * (2 * value - 2) + 1;
}
