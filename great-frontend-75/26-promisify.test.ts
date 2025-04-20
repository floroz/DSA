/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, test } from "vitest";

// Define the standard Node.js callback signature
type Callback<E, V> = (err: E | null | undefined, value?: V) => void;

// Define the type for the function to be promisified
// A: Tuple type for the arguments array
// E: Type of the error argument in the callback
// V: Type of the value argument in the callback
type NodeStyleCallbackFunction<A extends any[], E, V> = (
  this: any,
  ...args: [...A, Callback<E, V>]
) => void;

// Define the type for the resulting promisified function
type PromisifiedFunction<A extends any[], V> = (
  this: any,
  ...args: A
) => Promise<V>;

export default function promisify<A extends any[], E, V>(
  func: NodeStyleCallbackFunction<A, E, V>
): PromisifiedFunction<A, V> {
  // Return a new function that wraps the original
  return function (this: any, ...args: A): Promise<V> {
    // Preserve the 'this' context from the call site
    const ctx = this;
    // Return a new Promise
    return new Promise<V>((resolve, reject) => {
      // Define the callback function that will be passed to the original function
      const callback: Callback<E, V> = (err, value) => {
        if (err) {
          // If the callback received an error, reject the promise
          reject(err);
        } else {
          // If the callback received a value, resolve the promise.
          // We use a type assertion `as V` because the callback signature allows `value` to be potentially undefined,
          // but the Promise<V> expects a value of type V. If V can legitimately be undefined,
          // the caller should use `promisify<..., ..., V | undefined>(...)`.
          resolve(value as V);
        }
      };

      // Call the original function using `apply` to set the 'this' context (`ctx`)
      // and pass the original arguments (`args`) along with the newly created callback.
      func.apply(ctx, [...args, callback]);
    });
  };
}
describe("promisify", () => {
  function delayedResolve(cb: Function) {
    setTimeout(() => {
      cb(null, 42);
    }, 10);
  }

  function asyncError(x: number, cb: Function) {
    setTimeout(() => {
      cb(x);
    }, 10);
  }

  describe("returns correct types", () => {
    test("returns a function", () => {
      const promisified = promisify(delayedResolve);
      expect(promisified).toBeInstanceOf(Function);
    });

    test("calling promisified returns a promise", () => {
      const promisified = promisify(delayedResolve);
      expect(promisified()).toBeInstanceOf(Promise);
    });
  });

  describe("use with await", () => {
    describe("resolved", () => {
      test("no arguments", async () => {
        expect.assertions(1);
        const promisified = promisify(delayedResolve);
        const res = await promisified();
        expect(res).toBe(42);
      });

      test("one argument", async () => {
        function asyncIdentity<T>(x: T, cb: Function) {
          setTimeout(() => {
            cb(null, x);
          }, 10);
        }

        expect.assertions(1);
        const promisified = promisify(asyncIdentity);
        const res = await promisified(23);
        expect(res).toBe(23);
      });

      test("two arguments", async () => {
        function asyncAdd(a: number, b: number, cb: Function) {
          setTimeout(() => {
            cb(null, a + b);
          }, 10);
        }

        expect.assertions(1);
        const promisified = promisify(asyncAdd);
        const res = await promisified(17, 19);
        expect(res).toBe(36);
      });
    });

    test("rejected", async () => {
      expect.assertions(1);
      try {
        const promisified = promisify(asyncError);
        await promisified(23);
      } catch (err) {
        expect(err).toBe(23);
      }
    });
  });

  test("can access `this`", async () => {
    expect.assertions(1);
    function asyncAdd(this: any, a: number, b: number, cb: Function) {
      setTimeout(() => {
        cb(null, a + b + this.base);
      }, 10);
    }

    const promisifiedAdd = promisify(asyncAdd);
    const obj = { base: 5, add: promisifiedAdd };
    const res = await obj.add(17, 19);
    expect(res).toBe(41);
  });

  describe("use without await", () => {
    test("then", async () => {
      expect.assertions(1);
      const promisified = promisify(delayedResolve);
      const res = await promisified();
      expect(res).toBe(42);
    });

    test("catch", async () => {
      expect.assertions(1);
      const promisified = promisify(asyncError);
      try {
        await promisified(23);
      } catch (error) {
        expect(error).toBe(23);
      }
    });
  });
});
