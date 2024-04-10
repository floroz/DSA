import { describe, expect, it } from "vitest";

/**
 * Also called Priority Queue. Can be represented as an Array List.
 *
 * Binary Min Heap:
 *          50
 *        /    \
 *     100    150
 *   /  \    /  \
 * 200  250 300  400
 *
 * represented as an Array List
 * [50, 100, 150, 200, 250, 300, 400]
 *  0    1    2    3    4    5    6
 *
 * The formula to find the parent of a node is:
 * parent = Math.floor((index - 1) / 2)
 * The formula to find the left child of a node is:
 * left = 2 * index + 1
 * The formula to find the right child of a node is:
 * right = 2 * index + 2
 */
class MinHeap {
  #heap: number[] = [];

  /**
   * Time Complexity - O(log N)
   */
  add(value: number): void {
    this.#heap.push(value);
    this.heapifyUp(this.lastIndex);
  }

  /**
   * Time Complexity - O(1)
   */
  peek(): number {
    return this.#heap[0];
  }

  /**
   * Time Complexity - O(log N)
   */
  delete(): number | undefined {
    if (this.length === 0) {
      return;
    }

    if (this.length === 1) {
      return this.#heap.pop();
    }

    const last = this.#heap.pop();
    const deleted = this.#heap[0];
    this.#heap[0] = last!;
    this.heapifyDown(0);
    return deleted;
  }

  get lastIndex() {
    return this.length - 1;
  }

  get length() {
    return this.#heap.length;
  }

  /**
   * Time Complexity - O(log N)
   */
  private heapifyDown(index: number) {
    if (index >= this.length) {
      return;
    }

    const leftIndex = this.leftChildIndex(index);
    const rightIndex = this.rightChildIndex(index);

    const leftValue = this.#heap[leftIndex];
    const rightValue = this.#heap[rightIndex];
    const currentValue = this.#heap[index];

    if (leftValue < currentValue) {
      this.#heap[index] = leftValue;
      this.#heap[leftIndex] = currentValue;
      this.heapifyUp(leftIndex);
    }

    if (rightValue < currentValue) {
      this.#heap[index] = rightValue;
      this.#heap[rightIndex] = currentValue;
      this.heapifyDown(rightIndex);
    }
  }

  /**
   * Time Complexity - O(log N)
   */
  private heapifyUp(index: number) {
    if (index <= 0) {
      return;
    }

    const parentIndex = this.parentIndex(index);
    const parentValue = this.#heap[parentIndex];
    const currentValue = this.#heap[index];

    if (currentValue < parentValue) {
      this.swap(parentIndex, index);
      this.heapifyUp(parentIndex);
    }
  }

  private swap(idx1, idx2) {
    const temp = this.#heap[idx1];
    this.#heap[idx1] = this.#heap[idx2];
    this.#heap[idx2] = temp;
  }

  private parentIndex(index: number) {
    return Math.floor((index - 1) / 2);
  }

  private leftChildIndex(index: number) {
    return 2 * index + 1;
  }

  private rightChildIndex(index: number) {
    return 2 * index + 2;
  }
}

describe("MinHeap", () => {
  it("should create a min heap", () => {
    const heap = new MinHeap();
    expect(heap.length).toBe(0);
    expect(heap.peek()).toBeUndefined();
  });

  it("should add value to min heap", () => {
    const heap = new MinHeap();
    heap.add(5);
    expect(heap.length).toBe(1);
    expect(heap.peek()).toBe(5);
  });

  it("should add many values to the min heap", () => {
    const heap = new MinHeap();
    heap.add(5);
    heap.add(3);
    heap.add(7);
    heap.add(2);
    heap.add(4);
    expect(heap.length).toBe(5);
    expect(heap.peek()).toBe(2);
  });

  it("should peek value from min heap", () => {
    const heap = new MinHeap();
    heap.add(5);
    heap.add(3);
    heap.add(7);
    expect(heap.length).toBe(3);
    expect(heap.peek()).toBe(3);
    heap.add(2);
    expect(heap.peek()).toBe(2);
  });

  it("should delete value from min heap", () => {
    const heap = new MinHeap();
    heap.add(5);
    heap.add(3);
    heap.add(7);
    heap.add(2);
    heap.add(4);
    expect(heap.length).toBe(5);
    expect(heap.peek()).toBe(2);
    const deleted = heap.delete();
    expect(deleted).toBe(2);
    expect(heap.length).toBe(4);
    expect(heap.peek()).toBe(3);
  });
});
