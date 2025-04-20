/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, test } from "vitest";

// Use generics for arguments array type (A) and return type (R)
type GenericFn<A extends any[], R> = (this: any, ...args: A) => R;

// The memoized function should have the same signature
export default function memoize<A extends any[], R>(
  func: GenericFn<A, R>
): GenericFn<A, R> {
  const cache = new Map<string, R>();

  return function (this: any, ...args: A): R {
    // Create a cache key using JSON.stringify.
    // Note: This has limitations (object key order, non-serializable types).
    // For more complex scenarios, a custom serializer or nested Maps might be needed.
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!; // Non-null assertion ok because we checked `has`
    }

    const result = func.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

describe("memoize", () => {
  test("returns a function", () => {
    const memoizedFn = memoize(() => {});
    expect(memoizedFn).toBeInstanceOf(Function);
  });

  test("single number argument", () => {
    let count = 0;
    function double(x: number): number {
      count++;
      return x * 2;
    }
    const memoizedDouble = memoize(double);
    expect(count).toBe(0);
    expect(memoizedDouble(1)).toBe(2);
    expect(count).toBe(1);
    expect(memoizedDouble(1)).toBe(2); // Cached
    expect(count).toBe(1);
    expect(memoizedDouble(2)).toBe(4); // New arg
    expect(count).toBe(2);
    expect(memoizedDouble(2)).toBe(4); // Cached
    expect(count).toBe(2);
  });

  // Test with a single string argument
  test("single string argument", () => {
    let count = 0;
    function repeat(x: string): string {
      count++;
      return x + x;
    }
    const memoizedRepeat = memoize(repeat);
    expect(count).toBe(0);
    expect(memoizedRepeat("foo")).toBe("foofoo");
    expect(count).toBe(1);
    expect(memoizedRepeat("foo")).toBe("foofoo"); // Cached
    expect(count).toBe(1);
    expect(memoizedRepeat("bar")).toBe("barbar"); // New arg
    expect(count).toBe(2);
    expect(memoizedRepeat("bar")).toBe("barbar"); // Cached
    expect(count).toBe(2);
  });

  // Test with multiple arguments
  test("multiple arguments (numbers)", () => {
    let count = 0;
    function add(x: number, y: number): number {
      count++;
      return x + y;
    }
    const memoizedAdd = memoize(add);
    expect(count).toBe(0);
    expect(memoizedAdd(1, 2)).toBe(3); // key: '[1,2]'
    expect(count).toBe(1);
    expect(memoizedAdd(1, 2)).toBe(3); // Cached
    expect(count).toBe(1);
    expect(memoizedAdd(2, 1)).toBe(3); // key: '[2,1]' (different key)
    expect(count).toBe(2);
    expect(memoizedAdd(2, 1)).toBe(3); // Cached
    expect(count).toBe(2);
  });

  // Test with mixed argument types
  test("multiple arguments (mixed types)", () => {
    let count = 0;
    function combine(x: number, y: string): string {
      count++;
      return `${x}-${y}`;
    }
    const memoizedCombine = memoize(combine);
    expect(count).toBe(0);
    expect(memoizedCombine(1, "a")).toBe("1-a"); // key: '[1,"a"]'
    expect(count).toBe(1);
    expect(memoizedCombine(1, "a")).toBe("1-a"); // Cached
    expect(count).toBe(1);
    expect(memoizedCombine(2, "a")).toBe("2-a"); // key: '[2,"a"]'
    expect(count).toBe(2);
  });

  // Test differentiation based on stringified key
  test("differentiates arguments based on stringified key", () => {
    let count = 0;
    function identity<T>(x: T): T {
      count++;
      return x;
    }
    const memoizedIdentity = memoize(identity);
    expect(memoizedIdentity("1")).toBe("1"); // key: '["1"]'
    expect(count).toBe(1);
    expect(memoizedIdentity(1)).toBe(1); // key: '[1]'
    expect(count).toBe(2);
    expect(memoizedIdentity("1")).toBe("1"); // Cached
    expect(count).toBe(2);
    expect(memoizedIdentity(1)).toBe(1); // Cached
    expect(count).toBe(2);
  });

  // Test `this` context
  test("can access `this`", () => {
    let count = 0;
    function mul(this: { base: number }, x: number): number {
      count++;
      return this.base * x;
    }
    const obj = {
      base: 10,
      memoizedMul: memoize(mul),
    };
    expect(count).toBe(0);
    expect(obj.memoizedMul(5)).toBe(50); // `this` is obj, key: '[5]'
    expect(count).toBe(1);
    expect(obj.memoizedMul(5)).toBe(50); // Cached
    expect(count).toBe(1);

    // Note: Cache is tied to the memoized function instance, not `this`.
    const obj2 = { base: 20, memoizedMul: obj.memoizedMul };
    expect(obj2.memoizedMul(5)).toBe(50); // Hits cache from obj.memoizedMul(5)
    expect(count).toBe(1); // Original `mul` not called again
  });

  // Test object arguments (demonstrates JSON.stringify behavior)
  test("object arguments", () => {
    let count = 0;
    function processObj(obj: { a: number }): number {
      count++;
      return obj.a * 2;
    }
    const memoizedProcess = memoize(processObj);
    const obj1 = { a: 1 };
    const obj2 = { a: 1 }; // Same structure/values, different reference

    expect(memoizedProcess(obj1)).toBe(2); // key: '[{"a":1}]'
    expect(count).toBe(1);
    expect(memoizedProcess(obj2)).toBe(2); // key: '[{"a":1}]' - Hits cache
    expect(count).toBe(1);
  });
});
