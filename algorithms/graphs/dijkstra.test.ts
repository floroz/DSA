import { describe, expect, it } from "vitest";

const NOT_FOUND = -1;
const isWall = (cell: number) => cell === 1;
const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

/**
 * A basic implementation of Dijsktra's algorithm to find the shortest path between two points in a maze.
 */
function findShortestPathLength(
  maze: number[][],
  start: [number, number],
  end: [number, number]
): number {
  const [startX, startY] = start;
  const [endX, endY] = end;

  // if the start and end are next to each other, the shortest path is 1
  if (Math.abs(startX - endX) + Math.abs(startY - endY) === 1) {
    return 1;
  }

  // array of numbers - 0 means unvisited, greater than 0 is the weight of the path (how many steps taken from origin to get there)
  const visitedA = maze.map(() => Array(maze[0].length).fill(0));
  const visitedB = maze.map(() => Array(maze[0].length).fill(0));

  const queueA = [[startX, startY, 0]];
  const queueB = [[endX, endY, 0]];

  while (queueA.length && queueB.length) {
    const [xA, yA, stepsA] = queueA.shift()!;
    const [xB, yB, stepsB] = queueB.shift()!;

    if (
      xA >= 0 &&
      xA < maze.length &&
      yA >= 0 &&
      yA < maze[0].length &&
      !isWall(maze[xA][yA])
    ) {
      if (!visitedA[xA][yA]) {
        visitedA[xA][yA] = stepsA + 1; // Assign the step number to the visited array

        if (visitedB[xA][yA]) {
          // The full path is the sum of the steps to the intersection point from A and B)
          return visitedA[xA][yA] + visitedB[xA][yA] - 2; // Subtract 2 because we count the intersection point twice
        }

        for (let [r, c] of dirs) {
          queueA.push([xA + r, yA + c, stepsA + 1]);
        }
      }
    }

    if (
      xB >= 0 &&
      xB < maze.length &&
      yB >= 0 &&
      yB < maze[0].length &&
      !isWall(maze[xB][yB])
    ) {
      if (!visitedB[xB][yB]) {
        visitedB[xB][yB] = stepsB + 1; // Assign the step number to the visited array

        if (visitedA[xB][yB]) {
          // The full path is the sum of the steps to the intersection point from A and B
          return visitedA[xB][yB] + visitedB[xB][yB] - 2; // Subtract 2 because we count the intersection point twice
        }

        for (let [r, c] of dirs) {
          queueB.push([xB + r, yB + c, stepsB + 1]);
        }
      }
    }
  }

  return NOT_FOUND;
}

describe("pathfinding – happy path", function () {
  it("should solve a 4x4 maze", () => {
    const fourByFour = [
      [2, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 2],
    ];
    expect(findShortestPathLength(fourByFour, [0, 0], [3, 3])).toEqual(6);
  });

  it.skip("should solve a 6x6 maze", () => {
    const sixBySix = [
      [0, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 2, 0, 0, 0],
    ];
    expect(findShortestPathLength(sixBySix, [1, 1], [2, 5])).toEqual(7);
  });

  it.skip("should solve a 8x8 maze", () => {
    const eightByEight = [
      [0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 1, 0, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 1, 0],
      [0, 2, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 1, 2],
    ];
    expect(findShortestPathLength(eightByEight, [1, 7], [7, 7])).toEqual(16);
  });

  it("should solve a 15x15 maze", () => {
    const fifteenByFifteen = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0],
      [0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0],
      [0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
      [0, 0, 1, 0, 1, 0, 1, 1, 2, 1, 0, 1, 0, 1, 0],
      [0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    expect(findShortestPathLength(fifteenByFifteen, [1, 1], [8, 8])).toEqual(
      78
    );
  });
});

describe("pathfinding – edge cases", function () {
  it("should solve the maze if they're next to each other", () => {
    const byEachOther = [
      [0, 0, 0, 0, 0],
      [0, 2, 2, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1],
      [0, 0, 0, 0, 0],
    ];
    expect(findShortestPathLength(byEachOther, [1, 1], [2, 1])).toEqual(1);
  });

  it("should return -1 when there's no possible path", () => {
    const impossible = [
      [0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0],
      [0, 0, 1, 1, 1],
      [1, 1, 1, 0, 0],
      [0, 0, 0, 0, 2],
    ];
    expect(findShortestPathLength(impossible, [1, 1], [4, 4])).toEqual(-1);
  });
});
