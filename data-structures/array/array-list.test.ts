import { describe, it, expect } from "vitest";

class ArrayList<T> {
  length = 0;
  #arr: T[];

  constructor(private capacity = 10) {
    this.#arr = new Array<T>(this.capacity);
  }

  /**
   * Best case - O(1)
   * Worse case - O(N) - when capacity is exceeded
   */
  push(value: T): void {
    if (this.length === this.capacity) {
      this.capacity *= 2;

      const newArr = new Array<T>(this.capacity);
      for (let i = 0; i < this.length; i++) {
        newArr[i] = this.#arr[i]!;
      }

      this.#arr = newArr;
    }

    this.length++;

    this.#arr[this.length - 1] = value;
  }
  pop(): T | undefined {
    if (this.length === 0) {
      return;
    }

    const value = this.#arr[this.length - 1];

    this.#arr[this.length - 1] = undefined as T;
    this.length--;

    return value;
  }

  at(idx: number): T | undefined {
    if (idx >= this.length) return;

    return this.#arr[idx];
  }

  insertAt(idx: number, value: T): void {
    if (idx >= this.length) return;

    this.#arr[idx] = value;
  }
}

describe("ArrayList", () => {
  it("should create an empty array list", () => {
    const arr = new ArrayList();
    expect(arr.length).toBe(0);
  });

  it("should push an element to the array list", () => {
    const arr = new ArrayList();
    arr.push(1);
    expect(arr.length).toBe(1);
  });

  it("should pop an element from the array list", () => {
    const arr = new ArrayList();
    arr.push(1);
    expect(arr.pop()).toBe(1);
    expect(arr.length).toBe(0);
  });

  it("should double the capacity when pushing beyond the capacity", () => {
    const arr = new ArrayList(1);
    arr.push(1);
    arr.push(2);
    expect(arr.length).toBe(2);
  });

  it("should be able to access a given index", () => {
    const arr = new ArrayList(3);
    arr.push(1);
    arr.push(2);

    expect(arr.at(0)).toBe(1);
    expect(arr.at(1)).toBe(2);
  });

  it("should be able to insert at a given index", () => {
    const arr = new ArrayList(3);
    arr.push(1);
    arr.push(2);
    arr.insertAt(1, 3);

    expect(arr.at(1)).toBe(3);
  });

  it("should not insert at a given index if it's out of bounds", () => {
    const arr = new ArrayList(3);
    arr.push(1);
    arr.push(2);
    arr.insertAt(2, 3);

    expect(arr.at(2)).toBe(undefined);
  });
});
