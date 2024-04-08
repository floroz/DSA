import { describe, expect, it } from "vitest";

function calculateMiddle(left: number, right: number): number {
  return Math.floor(left + (right - left) / 2);
}

function binarySearch(arr: number[], item: number) {
  let left = 0;
  let right = arr.length - 1;
  let mid = calculateMiddle(left, right);

  while (left < right) {
    if (arr[mid] === item) {
      return mid;
    } else if (item > arr[mid]) {
      left = mid + 1;
    } else {
      right = mid;
    }

    mid = calculateMiddle(left, right);
  }

  return -1;
}

describe("binary search", () => {
  it("should return the index of the item if found in the array", () => {
    const arr = [1, 3, 5, 7, 9];
    const item = 5;
    const expectedIndex = 2;

    const result = binarySearch(arr, item);

    expect(result).toBe(expectedIndex);
  });

  it("should return -1 if the item is not found in the array", () => {
    const arr = [1, 3, 5, 7, 9];
    const item = 4;

    const result = binarySearch(arr, item);

    expect(result).toBe(-1);
  });

  // Additional test cases
  it("should return the index of the item if found in a larger array", () => {
    const arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
    const item = 13;
    const expectedIndex = 6;

    const result = binarySearch(arr, item);

    expect(result).toBe(expectedIndex);
  });

  it("should return -1 if the item is not found in a larger array", () => {
    const arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
    const item = 8;

    const result = binarySearch(arr, item);

    expect(result).toBe(-1);
  });
});

/**
 * Given two crystal balls at the top of a building, you need to find out exactly from which floor they would break
 *
 * O(sqrt(N))
 */
function twoCrystalBalls(arr: boolean[]): number {
   // Calculate jump length with sqrt of array length
   const jumpLength = Math.floor(Math.sqrt(arr.length));
   let i = 0;
 
   // Leaping through array with distance of jumplength in each leap
   for (; i < arr.length; i = i + jumpLength) {
     if (arr[i]) {
       break;
     }
   }
 
   // Going back by one leap to start walking using linear search
   i = i - jumpLength;
 
   // Walk one by one using linear search
   for (let j = i; j < i + jumpLength; j++) {
     if (arr[j]) {
       return j;
     }
   }
 
   // If reached here means, the ball is not breaking within this height
   return -1;
}

describe.skip("Two Crystall Ball Problem", () => {
  it("should return -1 when there are no floors where the ball breaks", () => {
    expect(twoCrystalBalls([false, false, false])).toBe(-1);
  });

  it("should return the correct index where the 2nd crystall ball breaks", () => {
    expect(
      twoCrystalBalls([false, false, false, false, true, true, true])
    ).toBe(4);
  });

  it("should return 0 when it breaks on ground floor", () => {
    expect(twoCrystalBalls([true])).toBe(0);
  });

  it("should return -1 when the building has only one floor", () => {
    expect(twoCrystalBalls([false])).toBe(-1);
  });

  it("should return 0 when the 2nd crystall ball breaks on the first floor", () => {
    expect(twoCrystalBalls([false, true])).toBe(1);
  });

  it("should return -1 when the 2nd crystall ball breaks on the last floor", () => {
    expect(twoCrystalBalls([false, false, false, false, false, true])).toBe(-1);
  });
});
