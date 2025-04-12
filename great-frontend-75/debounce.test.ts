import { test, expect, describe } from "vitest";

type Callback<T extends unknown[]> = (...args: T) => unknown;

function debounce<T extends unknown[]>(
  func: Callback<T>,
  wait: number
): Callback<T> {
  let interval: number | undefined;

  return function (this: unknown, ...args: T) {
    if (interval) {
      clearTimeout(interval);
    }

    interval = setTimeout(() => {
      func.apply(this, args);
      interval = 0;
    }, wait);
  };
}

interface Context {
  val: number;
}

describe("debounce", () => {
  test("can be initialized", () => {
    const increment = debounce(() => {}, 50);
    expect(increment).toBeTruthy();
  });

  test("executes after duration", async () => {
    let i = 0;
    const increment = debounce(() => {
      i++;
    }, 10);

    expect(i).toBe(0);
    increment();
    expect(i).toBe(0);

    await new Promise((resolve) =>
      setTimeout(() => {
        expect(i).toBe(1);
        resolve(null);
      }, 20)
    );
  });

  describe("uses arguments", () => {
    test("called once", async () => {
      let i = 21;
      const increment = debounce((a: number, b: number) => {
        i += a * b;
      }, 10);

      expect(i).toBe(21);
      increment(3, 7);
      expect(i).toBe(21);

      await new Promise((resolve) =>
        setTimeout(() => {
          expect(i).toBe(42);
          resolve(null);
        }, 20)
      );
    });

    test("uses arguments of latest invocation", async () => {
      let i = 21;
      const increment = debounce((a: number, b: number) => {
        i += a * b;
      }, 10);

      expect(i).toBe(21);
      increment(3, 7);
      increment(4, 5);
      expect(i).toBe(21);

      await new Promise((resolve) =>
        setTimeout(() => {
          expect(i).toBe(41);
          resolve(null);
        }, 20)
      );
    });
  });

  test("execute once even after calling it multiple times", async () => {
    let i = 0;
    const increment = debounce(() => {
      i++;
    }, 20);

    expect(i).toBe(0);
    increment();
    increment();
    increment();
    increment();
    expect(i).toBe(0);

    // Should not fire yet.
    setTimeout(() => {
      expect(i).toBe(0);
    }, 10);

    await new Promise((resolve) =>
      setTimeout(() => {
        expect(i).toBe(1);
        resolve(null);
      }, 30)
    );
  });

  test("duration extended if called again during window", async () => {
    let i = 0;
    const increment = debounce(() => {
      i++;
    }, 100);

    expect(i).toBe(0);
    increment();
    increment();
    expect(i).toBe(0);

    // Should not fire yet.
    setTimeout(() => {
      expect(i).toBe(0);
      increment();
      expect(i).toBe(0);
    }, 50);

    await new Promise((resolve) =>
      setTimeout(() => {
        // Still 0 because we fired again at t=50, increment will only happen at t=150
        expect(i).toBe(0);
        resolve(null);
      }, 125)
    );

    await new Promise((resolve) =>
      setTimeout(() => {
        expect(i).toBe(1);
        resolve(null);
        // Add a longer delay because the browser timer is unreliable.
      }, 1500)
    );
  });

  test("callbacks can access `this`", async () => {
    const increment = debounce(function (this: Context, delta: number) {
      this.val += delta;
    }, 10);

    const obj = {
      val: 2,
      increment,
    };

    expect(obj.val).toBe(2);
    obj.increment(3);
    expect(obj.val).toBe(2);

    await new Promise((resolve) =>
      setTimeout(() => {
        expect(obj.val).toBe(5);
        resolve(null);
      }, 20)
    );
  });
});
