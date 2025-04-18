import { describe, expect, test } from "vitest";

function isObject(v: unknown): v is Record<string, unknown> {
  return !Array.isArray(v) && typeof v === "object" && v !== null;
}

function isArray(v: unknown): v is unknown[] {
  return Array.isArray(v);
}

export default function deepEqual(valueA: unknown, valueB: unknown): boolean {
  // immediately dismiss two values that don't have the same type
  if (typeof valueA !== typeof valueB) return false;

  // handle edge case for null
  if (valueA === null || valueB === null) return valueA === valueB;

  // Handle Dates
  if (valueA instanceof Date && valueB instanceof Date) {
    return valueA.getTime() === valueB.getTime();
  }

  // Handle RegExps
  if (valueA instanceof RegExp && valueB instanceof RegExp) {
    return valueA.toString() === valueB.toString();
  }

  // handle arrays
  if (isArray(valueA) && isArray(valueB)) {
    if (valueA.length !== valueB.length) return false;

    for (let i = 0; i < valueA.length; i++) {
      // handle complex type
      if (isObject(valueA[i]) || isArray(valueA[i])) {
        if (!deepEqual(valueA[i], valueB[i])) return false;
        // or compare primitive values
      } else {
        if (valueA[i] !== valueB[i]) return false;
      }
    }
    // all indexes have been checked for equality
    return true;
  }

  // handle object literals
  if (isObject(valueA) && isObject(valueB)) {
    const keysA = Object.keys(valueA);
    const keysB = Object.keys(valueB);

    if (keysA.length !== keysB.length) {
      return false;
    }

    // Iterate through keys and compare values recursively
    for (const key of keysA) {
      // Check if key exists in B (redundant due to length check, but safe)
      if (!Object.hasOwn(valueB, key)) {
        return false;
      }
      const v1 = valueA[key];
      const v2 = valueB[key];

      if (!deepEqual(v1, v2)) {
        return false;
      }
    }

    // all keys have been checked for equality
    return true;
  }

  // Use Object.is to handle primitives and NaN correctly
  return Object.is(valueA, valueB);
}

describe("deepEqual", () => {
  test("primitive values", () => {
    expect(deepEqual(0, 0)).toEqual(true);
    expect(deepEqual("foo", "foo")).toEqual(true);
    expect(deepEqual(true, 1)).toEqual(false);
    expect(deepEqual(true, true)).toEqual(true);
    expect(deepEqual(false, false)).toEqual(true);
    expect(deepEqual(null, null)).toEqual(true);
  });

  describe("arrays", () => {
    test("empty", () => {
      expect(deepEqual([], [])).toEqual(true);
      expect(deepEqual({}, [])).toEqual(false);
    });

    test("number and strings", () => {
      expect(deepEqual([1], [1])).toEqual(true);
      expect(deepEqual(["1"], ["1"])).toEqual(true);
      expect(deepEqual([1], ["1"])).toEqual(false);
      expect(deepEqual([1, 2], [1, 2])).toEqual(true);
      expect(deepEqual([1, 2, 3], [1, 2, 3])).toEqual(true);
      expect(deepEqual([1, 2, 3], [1, 3, 2])).toEqual(false);
    });

    test("boolean", () => {
      expect(deepEqual([true], [true])).toEqual(true);
      expect(deepEqual([true], [1])).toEqual(false);
      expect(deepEqual([false], [false])).toEqual(true);
      expect(deepEqual([true], [false])).toEqual(false);
      expect(deepEqual([0], [false])).toEqual(false);
    });

    test("null-ish", () => {
      expect(deepEqual([null], [null])).toEqual(true);
    });

    test("objects", () => {
      expect(deepEqual([{ foo: 1 }], [{ foo: 1 }])).toEqual(true);
      expect(deepEqual([{ foo: 1 }], [{ foo: 2 }])).toEqual(false);
    });
  });

  describe("objects", () => {
    test("empty", () => {
      expect(deepEqual({}, {})).toEqual(true);
    });

    test("basic", () => {
      expect(deepEqual({}, {})).toEqual(true);
      expect(deepEqual({ foo: "bar" }, { foo: "bar" })).toEqual(true);
      expect(deepEqual({ foo: "bar", id: 1 }, { foo: "bar", id: 1 })).toEqual(
        true
      );
      expect(deepEqual({ foo: "bar", id: 1 }, { foo: "bar", id: "1" })).toEqual(
        false
      );
    });

    test("different keys", () => {
      expect(deepEqual({ foo: "bar" }, { fob: "bar" })).toEqual(false);
    });

    test("different values", () => {
      expect(deepEqual({ foo: "bar" }, { foo: "baz" })).toEqual(false);
    });

    test("same keys but different types", () => {
      expect(deepEqual({ 0: "foo" }, ["foo"])).toEqual(false);
    });

    test("array", () => {
      expect(
        deepEqual(
          { foo: "bar", item: [1, 2, { baz: "baz" }] },
          { foo: "bar", item: [1, 2, { baz: "baz" }] }
        )
      ).toEqual(true);
    });

    test("subset objects", () => {
      expect(
        deepEqual(
          { foo: "bar", item: [1, 2, { baz: "baz" }] },
          { foo: "bar", item: [1, 2, { baz: "baz" }], id: 1 }
        )
      ).toEqual(false);
    });

    test("null-ish", () => {
      expect(
        deepEqual({ foo: null, baz: "baz" }, { bar: "bar", baz: "baz" })
      ).toEqual(false);
      expect(
        deepEqual({ foo: null, bar: "baz" }, { foo: null, bar: "baz" })
      ).toEqual(true);
    });
  });
});
