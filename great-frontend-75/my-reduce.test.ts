/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, test } from "vitest";

declare global {
  interface Array<T> {
    myReduce<U>(
      callbackFn: (
        previousValue: U,
        currentValue: T,
        currentIndex: number,
        array: T[]
      ) => U,
      initialValue?: U
    ): U;
  }
}

Array.prototype.myReduce = function <T, U>(
  callbackFn: (
    previousValue: U,
    currentValue: T,
    currentIndex: number,
    array: T[]
  ) => U,
  initialValue: U
): U {
  let start = 0;

  if (initialValue === undefined) {
    if (this.length === 0) {
      throw new Error("invalid array size");
    }

    initialValue = this[0];
    start++;
  }

  for (let i = start; i < this.length; i++) {
    if (this[i] == undefined) {
      continue;
    }

    initialValue = callbackFn.call(this, initialValue, this[i], i, this);
  }

  return initialValue;
};

const add = (prev: any, curr: any) => prev + curr;
const multiplyByIndex = (prev: number, curr: number, index: number) =>
  prev + curr * index;
const subtract = (prev: number, curr: number) => prev - curr;
const sumOfSquares = (prev: any, curr: any, index: number, array: Array<any>) =>
  prev + curr * array[index];
const combineObj = (prev: object, curr: object) => ({ ...prev, ...curr });
const combineArr = (prev: Array<any>, curr: any) => [...prev, curr];

describe("Array.prototype.myReduce", () => {
  test("empty array equals initial value", () => {
    expect([].myReduce(add, 0)).toEqual(0);
    expect([].myReduce(subtract, 0)).toEqual(0);
  });

  test("one value", () => {
    expect([1].myReduce(add, 0)).toEqual(1);
    expect(["a"].myReduce(add, "")).toEqual("a");
  });

  test("two values", () => {
    expect([-4, 10].myReduce(add, 0)).toEqual(6);
    expect(["b", "c", "d"].myReduce(add, "")).toEqual("bcd");
  });

  test("multiple values", () => {
    expect([1, 2, 3].myReduce(add, 0)).toEqual(6);
    expect(["a", "b", "c", "d"].myReduce(add, "")).toEqual("abcd");
  });

  test("object values", () => {
    expect([{ foo: 1 }, { bar: 2 }].myReduce(combineObj)).toEqual({
      foo: 1,
      bar: 2,
    });
    expect([{ foo: 1 }, { bar: 2 }].myReduce(combineObj, {})).toEqual({
      foo: 1,
      bar: 2,
    });
  });

  test("array values", () => {
    expect([1, 2, 3].myReduce(combineArr, [])).toEqual([1, 2, 3]);
  });

  test("reducer uses index argument when provided", () => {
    expect([1, 2, 3].myReduce(multiplyByIndex, 0)).toEqual(8);
    expect([-1, -3, 4].myReduce(multiplyByIndex, 0)).toEqual(5);
  });

  test("reducer uses array argument when provided", () => {
    expect([1, 2, 3, 4].myReduce(sumOfSquares, 0)).toEqual(30);
    expect([-1, -3, 4].myReduce(sumOfSquares, 0)).toEqual(26);
  });

  test("no initial value provided and array is empty", () => {
    expect(() => {
      [].myReduce(add);
    }).toThrow();
  });

  test("no initial value provided and array is non-empty", () => {
    expect([1, 2, 3].myReduce(add)).toEqual(6);
    expect([-1, -3, 4].myReduce(sumOfSquares, 0)).toEqual(26);
  });

  test("sparse arrays", () => {
    // eslint-disable-next-line no-sparse-arrays
    expect([1, 2, , 3].myReduce(add)).toEqual(6);
    // eslint-disable-next-line no-sparse-arrays
    expect([-1, -3, 4, , ,].myReduce(sumOfSquares, 0)).toEqual(26);
  });
});
