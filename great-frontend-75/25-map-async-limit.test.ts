import { describe, expect, test } from "vitest";

// Refactored implementation using the runTask approach
export default function mapAsyncLimit<T, U>(
  iterable: Array<T>,
  callbackFn: (value: T) => Promise<U>,
  limitInput?: number
): Promise<Array<U>> {
  return new Promise((resolve, reject) => {
    // Handle empty input array edge case
    if (!iterable || iterable.length === 0) {
      resolve([]);
      return;
    }

    const results = new Array<U>(iterable.length);
    // Use a Set to track promises currently in flight for efficient removal
    const inflight = new Set<Promise<void>>();
    let currentIndex = 0;
    let tasksCompleted = 0;
    let rejected = false; // Flag to prevent further processing after rejection

    // Determine the actual concurrency limit
    const limit =
      typeof limitInput === "number" && limitInput > 0
        ? Math.min(limitInput, iterable.length)
        : iterable.length;

    // Function to start processing a task at a given index
    function runTask(index: number) {
      // Stop starting new tasks if the main promise has already been rejected
      if (rejected) return;

      // Assert non-null as index is managed within bounds
      const item = iterable[index]!;

      // Call the user-provided async callback function
      const taskPromise = callbackFn(item);

      // Create a wrapper promise. This promise's resolution/rejection doesn't
      // directly affect the main promise's result array, but its settlement
      // controls the concurrency flow.
      const wrapperPromise = taskPromise
        .then((result) => {
          // Check rejection flag again, as another task might have rejected
          // while this one was awaiting
          if (rejected) return;
          // Store the result in the correct position
          results[index] = result;
        })
        .catch((error) => {
          // If this is the first rejection, set the flag and reject the main promise
          if (!rejected) {
            rejected = true;
            reject(error);
          }
          // We don't re-throw here; the main promise is already rejected.
          // The finally block will handle cleanup.
        })
        .finally(() => {
          // This block executes regardless of success or failure

          // Remove this task's wrapper promise from the inflight set
          inflight.delete(wrapperPromise);

          // Only proceed with completion logic if not rejected
          if (!rejected) {
            tasksCompleted++;

            // If all tasks are completed, resolve the main promise
            if (tasksCompleted === iterable.length) {
              resolve(results);
            } else {
              // If there are more items in the iterable, start the next task
              // This naturally throttles based on the limit because runTask
              // is only called when a slot opens up (in finally)
              if (currentIndex < iterable.length) {
                runTask(currentIndex++);
              }
            }
          }
          // If rejected, we simply clean up the inflight set. No new tasks are started.
        });

      // Add the wrapper promise to the set of inflight tasks
      inflight.add(wrapperPromise);
    }

    // Start the initial batch of tasks, up to the concurrency limit
    while (inflight.size < limit && currentIndex < iterable.length) {
      runTask(currentIndex++);
    }
  });
}

describe("mapAsyncLimit", () => {
  test("returns promise", () => {
    const p = mapAsyncLimit([], asyncIdentity);
    expect(p).toBeInstanceOf(Promise);
  });

  test("empty input array", async () => {
    expect.assertions(1);
    const res = await mapAsyncLimit([], asyncIdentity);
    expect(res).toEqual([]);
  });

  test("single item", async () => {
    expect.assertions(1);
    const res = await mapAsyncLimit([3], asyncDouble);
    expect(res).toEqual([6]);
  });

  describe("multiple items", () => {
    describe("no limit", () => {
      test("all resolved", async () => {
        expect.assertions(1);
        const res = await mapAsyncLimit([2, 3, 4, 5, 6], asyncSquare);
        expect(res).toEqual([4, 9, 16, 25, 36]);
      });

      test("some rejected", async () => {
        expect.assertions(1);
        await expect(mapAsyncLimit([2, 3], asyncRejectOdd)).rejects.toBe(9);
      });
    });

    test("limit of one", async () => {
      expect.assertions(1);
      let ongoing = 0;
      const limit = 1;

      const res = await mapAsyncLimit(
        [2, 3, 4, 5, 6],
        (x: number) => {
          ongoing++;
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (ongoing > limit) {
                reject("Concurrency limit exceeded");
              }

              resolve(x * x);
              ongoing--;
            }, 10);
          });
        },
        limit
      );

      expect(res).toEqual([4, 9, 16, 25, 36]);
    });

    test("limit of two", async () => {
      expect.assertions(1);
      let ongoing = 0;
      const limit = 2;

      const res = await mapAsyncLimit(
        [2, 3, 4, 5, 6],
        (x: number) => {
          ongoing++;
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (ongoing > limit) {
                reject("Concurrency limit exceeded");
              }

              resolve(x * x);
              ongoing--;
            }, 10);
          });
        },
        limit
      );

      expect(res).toEqual([4, 9, 16, 25, 36]);
    });

    test("limit more than the input", async () => {
      expect.assertions(1);
      let ongoing = 0;
      const limit = 10;

      const res = await mapAsyncLimit(
        [2, 3, 4, 5, 6],
        (x: number) => {
          ongoing++;
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (ongoing > limit) {
                reject("Concurrency limit exceeded");
              }

              resolve(x * x);
              ongoing--;
            }, 10);
          });
        },
        limit
      );

      expect(res).toEqual([4, 9, 16, 25, 36]);
    });
  });
});

const asyncIdentity = (x: number) => Promise.resolve(x);
const asyncDouble = (x: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(x * 2);
    }, 10);
  });
const asyncSquare = (x: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(x * x);
    }, 10);
  });
const asyncRejectOdd = (x: number) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (x % 2 === 1) {
        reject(x * 3);
      }

      resolve(x * 2);
    }, 10);
  });
