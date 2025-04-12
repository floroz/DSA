// // Single-level arrays are unaffected.
// flatten([1, 2, 3]); // [1, 2, 3]

import { describe, expect, test } from "vitest";

// // Inner arrays are flattened into a single level.
// flatten([1, [2, 3]]); // [1, 2, 3]
// flatten([
//   [1, 2],
//   [3, 4],
// ]); // [1, 2, 3, 4]

// // Flattens recursively.
// flatten([1, [2, [3, [4, [5]]]]]); // [1, 2, 3, 4, 5]

function flatten<U>(arr: (U | U[])[]): U[] {
  const res: U[] = [];

  for (const el of arr) {
    if (Array.isArray(el)) {
      res.push(...flatten(el));
    } else {
      res.push(el);
    }
  }

  return res;
}

describe("flatten array", () => {
  test("empty array", () => {
    expect(flatten([])).toEqual([]);
    expect(flatten([[], [[]], [[], [[[]]]]])).toEqual([]);
  });

  test("single-element array", () => {
    expect(flatten([1])).toEqual([1]);
    expect(flatten(["foo"])).toEqual(["foo"]);
    expect(flatten([undefined])).toEqual([undefined]);
  });

  test("array with only one level", () => {
    expect(flatten([1, 2, 3])).toEqual([1, 2, 3]);
    expect(flatten(["foo", "bar"])).toEqual(["foo", "bar"]);
    expect(flatten([null, true, undefined])).toEqual([null, true, undefined]);
  });

  test("array with multiple levels of nesting", () => {
    expect(flatten([0, 1, 2, [3, 4]])).toEqual([0, 1, 2, 3, 4]);
    expect(flatten([1, [2, [3]]])).toEqual([1, 2, 3]);
    expect(
      flatten([
        [1, 2],
        [3, 4],
      ])
    ).toEqual([1, 2, 3, 4]);
    expect(flatten(["foo", ["bar"]])).toEqual(["foo", "bar"]);
    expect(flatten([[null, [true]], undefined])).toEqual([
      null,
      true,
      undefined,
    ]);
  });

  test("list-style array", () => {
    expect(flatten([1, [2, [3, [4, [5]]]]])).toEqual([1, 2, 3, 4, 5]);
    expect(flatten([[[[[1], 2], 3], 4], 5])).toEqual([1, 2, 3, 4, 5]);
  });

  test("deeply-nested single-element array", () => {
    expect(flatten([[[[1]]]])).toEqual([1]);
  });
});
