import { describe, it, expect } from "vitest";

/**
 *
 * O (N^2)
 */
function bubbleSort(arr: number[]): number[] {
  for (let len = arr.length; len > 0; len--) {
    for (let i = 0; i < len - 1; i++) {
      const left = arr[i]!;
      const right = arr[i + 1]!;

      if (left > right) {
        arr[i] = right;
        arr[i + 1] = left;
      }
    }
  }

  return arr;
}

describe("Bubble sort", () => {
  const testCases: [number[], number[]][] = [
    [
      [5, 3, 7, 1],
      [1, 3, 5, 7],
    ],
    [
      [9, 2, 6, 4],
      [2, 4, 6, 9],
    ],
    [
      [8, 1, 5, 2],
      [1, 2, 5, 8],
    ],
    [
      [3, 6, 2, 9],
      [2, 3, 6, 9],
    ],
    [
      [4, 7, 1, 8],
      [1, 4, 7, 8],
    ],
  ];

  testCases.forEach(([unsorted, sorted]) => {
    it(`should sort ${unsorted.toString()} to ${sorted.toString()}`, () => {
      expect(bubbleSort([...unsorted])).toEqual(sorted); // Sort a copy to avoid modifying original test data
    });
  });
});
