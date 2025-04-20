import { describe, expect, test } from "vitest";

export default function squashObject(
  obj: Record<string, unknown>
): Record<string, unknown> {
  // handle edge cases
  if (typeof obj !== "object" || obj === null || Array.isArray(obj)) {
    return obj;
  }

  const result: Record<string, unknown> = {};

  function squash(
    obj: Record<string, unknown> | unknown[], // Allow arrays here too
    res: Record<string, unknown>,
    prevKey: string
  ) {
    // Base case check: Ensure we are working with an object or array
    if (typeof obj !== "object" || obj === null) {
      // Should not happen if called correctly from within the logic,
      // as primitives are assigned directly by the caller.
      return;
    }

    if (Array.isArray(obj)) {
      // Handle arrays
      obj.forEach((value, i) => {
        const currentKey = `${prevKey}${prevKey ? "." : ""}${i}`;
        if (typeof value === "object" && value !== null) {
          // If value is an object/array, recurse without assigning result
          squash(value as Record<string, unknown> | unknown[], res, currentKey);
        } else {
          // If value is primitive, assign it directly
          res[currentKey] = value;
        }
      });
    } else {
      // Handle objects (Record<string, unknown>)
      Object.keys(obj).forEach((key) => {
        if (!Object.hasOwn(obj, key)) {
          return; // Skip non-own properties
        }

        const value = obj[key];

        if (!key) {
          // Handle empty key: recurse with the *same* prevKey
          if (typeof value === "object" && value !== null) {
            squash(value as Record<string, unknown> | unknown[], res, prevKey);
          } else {
            // If empty key leads directly to a primitive, assign to prevKey
            // This handles { a: { "": 1 } } -> { a: 1 }
            // It also handles { "": { "": 1 } } -> { "": 1 } if prevKey was "" initially
            // Or { foo: { "": { "": 1 } } } -> { foo: 1 }
            // Only assign if prevKey is not empty OR if the original object had an empty key at the root
            if (prevKey !== "" || Object.keys(obj).some((k) => k === "")) {
              res[prevKey] = value;
            }
          }
        } else {
          // Handle non-empty key
          const newKey = `${prevKey}${prevKey ? "." : ""}${key}`;
          if (typeof value === "object" && value !== null) {
            // If value is an object/array, recurse without assigning result
            squash(value as Record<string, unknown> | unknown[], res, newKey);
          } else {
            // If value is primitive, assign it directly
            res[newKey] = value;
          }
        }
      });
    }
  }

  squash(obj, result, "");

  return result;
}

describe("squashObject", () => {
  test("empty", () => {
    expect(squashObject({})).toEqual({});
  });

  test("no nesting", () => {
    expect(squashObject({ a: "1", b: "b" })).toEqual({ a: "1", b: "b" });
  });

  test("one level of nesting", () => {
    expect(
      squashObject({
        a: 5,
        c: {
          f: 9,
        },
      })
    ).toEqual({ a: 5, "c.f": 9 });
  });

  test("multiple levels of nesting", () => {
    expect(
      squashObject({
        a: 5,
        b: 6,
        c: {
          f: 9,
          g: {
            m: 17,
            n: 3,
          },
        },
      })
    ).toEqual({ a: 5, b: 6, "c.f": 9, "c.g.m": 17, "c.g.n": 3 });
  });

  test("arrays", () => {
    expect(
      squashObject({
        a: ["hi", "bye"],
      })
    ).toEqual({
      "a.0": "hi",
      "a.1": "bye",
    });
  });

  test("null-ish values", () => {
    expect(
      squashObject({
        a: {
          a: 0,
          b: null,
          c: false,
          d: undefined,
        },
      })
    ).toEqual({
      "a.a": 0,
      "a.b": null,
      "a.c": false,
      "a.d": undefined,
    });
  });

  describe("empty keys", () => {
    test("single layer of empty key", () => {
      expect(
        squashObject({
          foo: {
            "": 0,
            a: 1,
          },
        })
      ).toEqual({
        foo: 0,
        "foo.a": 1,
      });
    });

    test("nested empty keys", () => {
      expect(
        squashObject({
          foo: {
            "": {
              "": 1,
              bar: 2,
            },
            a: 1,
          },
        })
      ).toEqual({
        foo: 1,
        "foo.bar": 2,
        "foo.a": 1,
      });
    });
  });

  test("everything", () => {
    expect(
      squashObject({
        a: "hi",
        b: {
          a: null,
          b: ["foo", "", null, "bar"],
          d: "hello",
          e: {
            a: "yo",
            b: undefined,
            c: "sup",
            d: 0,
            f: [
              { foo: 123, bar: 123 },
              { foo: 465, bar: 456 },
            ],
          },
        },
        c: "world",
      })
    ).toEqual({
      a: "hi",
      "b.a": null,
      "b.b.0": "foo",
      "b.b.1": "",
      "b.b.2": null,
      "b.b.3": "bar",
      "b.d": "hello",
      "b.e.a": "yo",
      "b.e.b": undefined,
      "b.e.c": "sup",
      "b.e.d": 0,
      "b.e.f.0.foo": 123,
      "b.e.f.0.bar": 123,
      "b.e.f.1.foo": 465,
      "b.e.f.1.bar": 456,
      c: "world",
    });
  });
});
