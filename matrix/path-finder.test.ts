import { describe, expect, it } from "vitest";

type Point = [number, number];

const dirs = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];
/**
 * Given a matrix of characters, find the shortest path from start to end.
 * 'X' represents a wall, 'O' represents an open space. You can only move up, down, left, or right.
 *
 * @example
 *
 * ```ts
 * pathFinding([
 * ['O', 'O', 'O', 'O'],
 * ['X', 'X', 'O', 'X'],
 * ['O', 'O', 'O', 'O'],
 * ['O', 'O', 'O', 'O'],
 * ], [0, 0], [3, 3])
 * ```
 */
function pathFinder(
  matrix: string[][],
  start: Point,
  [endRow, endCol]: Point
): Point[] {
  const visited = matrix.map(() => Array(matrix[0].length).fill(false));

  function visitor(start: Point, steps: Point[] = []): Point[] | null {
    const [row, col] = start;

    if (row < 0 || col >= matrix[0].length || row >= matrix.length || col < 0) {
      return null;
    }

    if (visited[row][col]) {
      return null;
    }

    const current = matrix[row][col];

    if (current === "X") {
      return null;
    }

    if (row === endRow && col === endCol) {
      steps.push([row, col]);
      return steps;
    }

    visited[row][col] = true;

    steps.push([row, col]);

    for (let i = 0; i < dirs.length; i++) {
      const [r, c] = dirs[i];
      const result = visitor([row + r, col + c], steps);
      if (Array.isArray(result)) {
        return result;
      }
    }

    return null;
  }
  return visitor(start) || [];
}

describe("pathFinding", () => {
  it("should find the shortest path", () => {
    expect(
      pathFinder(
        [
          ["O", "O", "O", "O"],
          ["X", "X", "O", "X"],
          ["O", "O", "O", "O"],
          ["O", "O", "O", "O"],
        ],
        [0, 0],
        [3, 3]
      )
    ).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 2],
      [2, 2],
      [3, 2],
      [3, 3],
    ]);
  });

    it("should return empty array if no path found", () => {
        expect(
        pathFinder(
            [
            ["O", "O", "O", "O"],
            ["X", "X", "O", "X"],
            ["O", "O", "O", "O"],
            ["O", "O", "O", "X"],
            ],
            [0, 0],
            [3, 3]
        )
        ).toEqual([]);
    });
});
