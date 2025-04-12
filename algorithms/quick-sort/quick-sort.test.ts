import { describe, expect, it } from "vitest";

/**
 * Quick sort is a divide and conquer algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays according to whether they are less than or greater than the pivot.
 * The sub-arrays are then sorted recursively. This can be done in-place, requiring small additional amounts of memory to perform the sorting.
 * Time complexity: O(n log n)
 * Space complexity: O(n)
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function _quickSort(arr: number[]) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[0];
  const left: number[] = [];
  const right: number[] = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i]! < pivot!) {
      left.push(arr[i]!);
    } else {
      right.push(arr[i]!);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

function partition(arr: number[], low: number, high: number) {
  const pivot = arr[high];
  // partitionIndex is the index of the smaller element
  let partitionIndex = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j]! < pivot!) {
      partitionIndex++;
      // swap arr[partitionIndex] and arr[j]
      [arr[partitionIndex]!, arr[j]!] = [arr[j]!, arr[partitionIndex]!];
    }
  }

  [arr[partitionIndex + 1]!, arr[high]!] = [
    arr[high]!,
    arr[partitionIndex + 1]!,
  ]; // swap pivot to its correct position
  return partitionIndex + 1;
}

/**
 * Version of quick sort that sorts the array in place.
 * Time complexity: O(n log n)
 * Space complexity: O(log n)
 */
function quickSort(
  arr: number[],
  low: number = 0,
  high: number = arr.length - 1
) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

describe("quickSort", () => {
  it("should sort the array", () => {
    expect(quickSort([3, 1, 2])).toEqual([1, 2, 3]);
    expect(quickSort([3, 1, 2, 4, 5, 6, 7])).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("should sort the array with negative numbers", () => {
    expect(quickSort([3, 1, 2, -1, -2])).toEqual([-2, -1, 1, 2, 3]);
  });

  it("should sort the array with duplicate numbers", () => {
    expect(quickSort([3, 1, 2, 1, 2])).toEqual([1, 1, 2, 2, 3]);
  });

  it("should sort the array with one element", () => {
    expect(quickSort([3])).toEqual([3]);
  });
});
