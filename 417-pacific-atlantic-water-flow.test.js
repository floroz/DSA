import { pacificAtlantic } from "./417-pacific-atlantic-water-flow";

test("it works", () => {
  const res = pacificAtlantic([
    [1, 2, 2, 3, 5],
    [3, 2, 3, 4, 4],
    [2, 4, 5, 3, 1],
    [6, 7, 1, 4, 5],
    [5, 1, 1, 2, 4],
  ]);

  const expected = [
    [0, 4],
    [1, 3],
    [1, 4],
    [2, 2],
    [3, 0],
    [3, 1],
    [4, 0],
  ];
  expect(res.length).toBe(expected.length);
  expect(res).toEqual(expect.arrayContaining(expected));
});
