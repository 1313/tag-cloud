/**
 * This code is not used here due to lack of time.
 * It was ment as a way of organizing the words in a cloud layout
 * with the largest words in the middle.
 * Uses midpoint circle rasterizer algoritm.
 */
class Canvas {
  private readonly matrix: string[][] = [];
  private readonly origin: number;
  constructor(readonly size: number) {
    this.origin = size / 2 + 1;
    for (let i = 0; i < size + 3; i++) {
      for (let j = 0; j < size + 3; j++) {
        if (!this.matrix[i]) {
          this.matrix[i] = [];
        }
        this.matrix[i][j] = ".";
      }
    }
  }
  draw(x: number, y: number) {
    this.matrix[x + this.origin][y + this.origin] = "x";
  }
  toString() {
    return this.matrix
      .map(row => `"${row.join(" ")}"`)
      .join("\n")
      .replace(/(x(\s(\.)\s?)+x)/g, a => a.replace(/\./g, "x"));
  }
}

export function rasterizeCircle(radius: number) {
  const canvas = new Canvas(radius * 2);
  let x = radius;
  let y = 0;
  let radiusError = 1 - x;

  while (x >= y) {
    canvas.draw(x, y);
    canvas.draw(y, x);
    canvas.draw(-x, y);
    canvas.draw(-y, x);
    canvas.draw(-x, -y);
    canvas.draw(-y, -x);
    canvas.draw(x, -y);
    canvas.draw(y, -x);
    y++;

    if (radiusError < 0) {
      radiusError += 2 * y + 1;
    } else {
      x--;
      radiusError += 2 * (y - x + 1);
    }
  }

  return canvas.toString();
}
