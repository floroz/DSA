import { describe, expect, test } from "vitest";

export default function deepOmit(v: unknown, keys: Array<string>): unknown {
  // create a map for fast lookups O(1)
  const map = new Map(keys.map((key) => [key, true]));

  function _deepOmit(val: unknown): unknown {
    const obj: Record<string, unknown> = {};

    // everything that is not a JS 'object' type
    if (typeof val !== "object" || val === null) {
      return val;
    }

    // arrays
    if (Array.isArray(val)) {
      return val.map((v) => _deepOmit(v));
    }

    // objects
    Object.keys(val).forEach((k) => {
      if (Object.hasOwn(val, k) && !map.has(k)) {
        obj[k] = _deepOmit((val as Record<string, unknown>)[k]);
      }
    });

    return obj;
  }

  return _deepOmit(v);
}

const data = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 4,
  },
  f: [5, 6],
};

describe("deepOmit", () => {
  test("empty object", () => {
    expect(deepOmit({}, [])).toEqual({});
  });

  test("empty keys", () => {
    const data = {
      a: 1,
      b: 2,
      c: {
        d: 3,
        e: 4,
      },
      f: [5, 6],
    };
    const result = deepOmit(data, []);
    expect(result).toEqual(data);
  });

  describe("non-nested object", () => {
    test("single key", () => {
      const keysToOmit = ["b"];
      const result = deepOmit(
        {
          a: 1,
          b: 2,
          c: 3,
        },
        keysToOmit
      );
      expect(result).toEqual({
        a: 1,
        c: 3,
      });
    });

    test("multiple keys", () => {
      const keysToOmit = ["b", "c", "e"];
      const result = deepOmit(data, keysToOmit);
      expect(result).toEqual({
        a: 1,
        f: [5, 6],
      });
    });
  });

  describe("nested objects", () => {
    test("remove from nested objects", () => {
      const nestedData = {
        a: 1,
        b: 2,
        c: {
          d: 3,
          e: {
            f: 4,
            g: 5,
          },
        },
      };
      const keysToOmit = ["b", "f"];
      const result = deepOmit(nestedData, keysToOmit);
      const expected = {
        a: 1,
        c: {
          d: 3,
          e: {
            g: 5,
          },
        },
      };
      expect(result).toEqual(expected);
    });

    test("remove entire nested object", () => {
      const nestedData = {
        a: 1,
        b: 2,
        c: {
          d: 3,
          e: {
            f: 4,
            g: 5,
          },
        },
      };
      const keysToOmit = ["e"];
      const result = deepOmit(nestedData, keysToOmit);
      const expected = {
        a: 1,
        b: 2,
        c: {
          d: 3,
        },
      };
      expect(result).toEqual(expected);
    });

    test("remove all keys from object", () => {
      const nestedData = {
        a: 1,
        b: 2,
        c: {
          d: 3,
          e: {
            f: 4,
            g: 5,
          },
        },
      };
      const keysToOmit = ["d", "e"];
      const result = deepOmit(nestedData, keysToOmit);
      const expected = {
        a: 1,
        b: 2,
        c: {},
      };
      expect(result).toEqual(expected);
    });
  });

  describe("arrays", () => {
    test("basic", () => {
      const dataWithArray = {
        a: 1,
        b: [2, 3],
        c: {
          d: 4,
          e: [5, 6],
        },
      };
      const keysToOmit = ["b", "e"];
      const result = deepOmit(dataWithArray, keysToOmit);
      const expected = {
        a: 1,
        c: {
          d: 4,
        },
      };
      expect(result).toEqual(expected);
    });

    test("objects within arrays", () => {
      const dataWithArray = {
        a: 1,
        b: [{ c: 2 }, 3],
        c: [{ a: 2, b: 3 }],
      };
      const keysToOmit = ["b", "e"];
      const result = deepOmit(dataWithArray, keysToOmit);
      const expected = {
        a: 1,
        c: [{ a: 2 }],
      };
      expect(result).toEqual(expected);
    });

    test("arrays within arrays", () => {
      const dataWithArray = {
        a: 1,
        b: [{ c: 2 }, [3]],
        c: [[{ a: 2, b: 3 }]],
      };
      const keysToOmit = ["b", "e"];
      const result = deepOmit(dataWithArray, keysToOmit);
      const expected = {
        a: 1,
        c: [[{ a: 2 }]],
      };
      expect(result).toEqual(expected);
    });
  });

  test("should not mutate the original object", () => {
    const keysToOmit = ["b", "c", "e"];
    console.log("Original data:", JSON.stringify(data));
    deepOmit(data, keysToOmit);
    console.log("Data after deepOmit:", JSON.stringify(data));
    expect(data).toEqual({
      a: 1,
      b: 2,
      c: {
        d: 3,
        e: 4,
      },
      f: [5, 6],
    });
  });
});
