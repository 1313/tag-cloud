import { rasterizeCircle } from "../grid-area-rasterizer";

it("should exist", () => {
  expect(rasterizeCircle).toBeDefined();
});

it("should draw x based on area", () => {
  expect(rasterizeCircle(1)).toBe(
    // prettier-ignore
    '". . . . ."\n' + 
    '". . x . ."\n' + 
    '". x x x ."\n' + 
    '". . x . ."\n' +
    '". . . . ."'
  );
  expect(rasterizeCircle(2)).toBe(
    // prettier-ignore
    '". . . . . . ."\n' + 
    '". . x x x . ."\n' + 
    '". x x x x x ."\n' + 
    '". x x x x x ."\n' + 
    '". x x x x x ."\n' + 
    '". . x x x . ."\n' +
    '". . . . . . ."'
  );
});
