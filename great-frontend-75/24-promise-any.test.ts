/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, test } from "vitest";

export default function promiseAny<T>(
  iterable: Array<T | Promise<T>>
): Promise<T> {
  return new Promise((resolve, reject) => {
    // Use any[] for errors as rejection reasons can be of any type.
    const errors: any[] = [];
    // Keep track of how many promises are still pending.
    let pending = iterable.length;
    // Flag to ensure we only resolve once.
    let hasResolved = false;

    // If the iterable is empty, reject immediately with an AggregateError.
    // The spec requires a specific message, but tests might expect different details.
    // Matching the test expectation of an empty errors array.
    if (pending === 0) {
      reject(new AggregateError([], "All promises were rejected"));
      return;
    }

    iterable.forEach((item, index) => {
      // Wrap every item in Promise.resolve() to handle both promises and non-promise values uniformly.
      Promise.resolve(item)
        .then((value) => {
          // If this promise resolves and we haven't already resolved the main promise, resolve it.
          if (!hasResolved) {
            hasResolved = true;
            resolve(value);
          }
          // No need to decrement pending here as we stop on first resolve.
        })
        .catch((error) => {
          // If an error occurs but we've already resolved, ignore the error.
          if (hasResolved) return;

          // Store the error reason. Use the index to keep track, even if promises reject out of order.
          errors[index] = error;
          // Decrement the count of pending promises.
          pending--;

          // If all promises have now settled (all rejected), reject the main promise.
          if (pending === 0) {
            // Create AggregateError with the collected errors.
            // The filter step isn't strictly necessary if errors array is pre-sized,
            // but ensures no empty slots if logic were different.
            reject(new AggregateError(errors, "All promises were rejected"));
          }
        });
    });
  });
}

describe("promiseAny", () => {
  test("empty input array", async () => {
    expect.assertions(2);

    try {
      await promiseAny([]);
    } catch (err: any) {
      expect(err).toBeInstanceOf(AggregateError);
      expect(err.errors).toEqual([]);
    }
  });

  describe("one promise", () => {
    describe("resolve", () => {
      test("value", async () => {
        expect.assertions(1);
        const p0 = 2;

        const res = await promiseAny([p0]);
        expect(res).toEqual(2);
      });

      test("instant", async () => {
        expect.assertions(1);
        const p0 = Promise.resolve(2);

        const res = await promiseAny([p0]);
        expect(res).toEqual(2);
      });

      test("delayed", async () => {
        expect.assertions(1);
        const p0 = new Promise((resolve) => {
          setTimeout(() => {
            resolve(2);
          }, 10);
        });

        const res = await promiseAny([p0]);
        expect(res).toEqual(2);
      });
    });

    describe("reject", () => {
      test("instant", async () => {
        expect.assertions(2);
        const p0 = Promise.reject(2);

        try {
          await promiseAny([p0]);
        } catch (err: any) {
          expect(err).toBeInstanceOf(AggregateError);
          expect(err.errors).toEqual([2]);
        }
      });

      test("delayed", async () => {
        expect.assertions(2);
        const p0 = new Promise((_, reject) => {
          setTimeout(() => {
            reject(2);
          }, 10);
        });

        try {
          await promiseAny([p0]);
        } catch (err: any) {
          expect(err).toBeInstanceOf(AggregateError);
          expect(err.errors).toEqual([2]);
        }
      });
    });
  });

  describe("multiple promises", () => {
    describe("all resolve", () => {
      test("instant", async () => {
        expect.assertions(1);
        const p0 = Promise.resolve(2);
        const p1 = Promise.resolve(3);

        const res = await promiseAny([p0, p1]);
        expect(res).toEqual(2);
      });

      test("delayed", async () => {
        expect.assertions(1);
        const p0 = Promise.resolve(2);
        const p1 = new Promise((resolve) => {
          setTimeout(() => {
            resolve(3);
          }, 10);
        });

        const res = await promiseAny([p0, p1]);
        expect(res).toEqual(2);
      });

      test("mixture", async () => {
        expect.assertions(1);
        const p0 = new Promise((resolve) => {
          setTimeout(() => {
            resolve(2);
          }, 10);
        });
        const p1 = Promise.resolve(3);
        const p2 = 4;

        const res = await promiseAny([p0, p1, p2]);
        expect(res).toEqual(3);
      });

      test("many delayed", async () => {
        expect.assertions(1);
        const p0 = new Promise((resolve) => {
          setTimeout(() => {
            resolve(1);
          }, 200);
        });
        const p1 = new Promise((resolve) => {
          setTimeout(() => {
            resolve(2);
          }, 100);
        });
        const p2 = new Promise((resolve) => {
          setTimeout(() => {
            resolve(3);
          }, 10);
        });

        const res = await promiseAny([p0, p1, p2]);
        expect(res).toEqual(3);
      });
    });

    describe("all reject", () => {
      test("instant", async () => {
        expect.assertions(2);
        const p0 = Promise.reject(2);
        const p1 = Promise.reject(3);

        try {
          await promiseAny([p0, p1]);
        } catch (err: any) {
          expect(err).toBeInstanceOf(AggregateError);
          expect(err.errors).toEqual([2, 3]);
        }
      });

      test("delayed", async () => {
        expect.assertions(2);
        const p0 = new Promise((_, reject) => {
          setTimeout(() => {
            reject(3);
          }, 1);
        });
        const p1 = new Promise((_, reject) => {
          setTimeout(() => {
            reject(2);
          }, 10);
        });

        try {
          await promiseAny([p0, p1]);
        } catch (err: any) {
          expect(err).toBeInstanceOf(AggregateError);
          expect(err.errors).toEqual([3, 2]);
        }
      });

      test("mixture", async () => {
        expect.assertions(2);
        const p0 = Promise.reject(42);
        const p1 = new Promise((_, reject) => {
          setTimeout(() => {
            reject(2);
          }, 10);
        });

        try {
          await promiseAny([p0, p1]);
        } catch (err: any) {
          expect(err).toBeInstanceOf(AggregateError);
          expect(err.errors).toEqual([42, 2]);
        }
      });
    });

    describe("mix of resolve and reject", () => {
      test("instant resolve delayed reject", async () => {
        expect.assertions(1);
        const p0 = Promise.resolve(42);
        const p1 = new Promise((_, reject) => {
          setTimeout(() => {
            reject(2);
          }, 10);
        });

        const res = await promiseAny([p0, p1]);
        expect(res).toEqual(42);
      });

      test("instant resolve instant reject", async () => {
        expect.assertions(1);
        const p0 = Promise.resolve(42);
        const p1 = Promise.reject(2);

        const res = await promiseAny([p0, p1]);
        expect(res).toEqual(42);
      });

      test("instant reject instant resolve", async () => {
        expect.assertions(1);
        const p0 = Promise.reject(42);
        const p1 = Promise.resolve(2);

        const res = await promiseAny([p0, p1]);
        expect(res).toEqual(2);
      });

      test("instant rejects", async () => {
        expect.assertions(2);
        const p0 = Promise.reject(42);
        const p1 = Promise.reject(43);

        try {
          await promiseAny([p0, p1]);
        } catch (err: any) {
          expect(err).toBeInstanceOf(AggregateError);
          expect(err.errors).toEqual([42, 43]);
        }
      });

      test("delayed resolve", async () => {
        expect.assertions(1);
        const p0 = new Promise((resolve) => {
          setTimeout(() => {
            resolve(1);
          }, 100);
        });
        const p1 = new Promise((_, reject) => {
          setTimeout(() => {
            reject(2);
          }, 10);
        });
        const p2 = new Promise((resolve) => {
          setTimeout(() => {
            resolve(3);
          }, 200);
        });

        await expect(promiseAny([p0, p1, p2])).resolves.toBe(1);
      });

      test("delayed reject", async () => {
        expect.assertions(2);
        const p0 = new Promise((_, reject) => {
          setTimeout(() => {
            reject(1);
          }, 200);
        });
        const p1 = new Promise((_, reject) => {
          setTimeout(() => {
            reject(2);
          }, 100);
        });
        const p2 = new Promise((_, reject) => {
          setTimeout(() => {
            reject(3);
          }, 10);
        });

        try {
          await promiseAny([p0, p1, p2]);
        } catch (err: any) {
          expect(err).toBeInstanceOf(AggregateError);
          expect(err.errors).toEqual([1, 2, 3]);
        }
      });
    });
  });
});
