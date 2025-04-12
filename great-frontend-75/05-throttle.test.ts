import { describe, expect, test } from "vitest";

function throttle<T, Args extends unknown[]>(
  cb: (this: T, ...args: Args) => unknown,
  wait: number
): (...args: Args) => unknown {
  let interval = 0;

  return function (this: T, ...args: Args): unknown {
    const ctx = this as T;
    if (interval) {
      return;
    }

    interval = setTimeout(() => {
      interval = 0;
    }, wait);

    return cb.apply(ctx, args);
  };
}

describe("throttle", () => {
  test("can be initialized", () => {
    const increment = throttle(() => {}, 50);
    expect(increment).toBeInstanceOf(Function);
  });

  test("invokes callback immediately", () => {
    let i = 0;
    const increment = throttle(() => {
      i++;
    }, 50);

    expect(i).toBe(0);
    increment();
    expect(i).toBe(1);
  });

  test("throttles immediate invocations", () => {
    let i = 0;
    const increment = throttle(() => {
      i++;
    }, 50);

    expect(i).toBe(0);
    increment();
    expect(i).toBe(1);
    increment();
    expect(i).toBe(1);
  });

  test("throttles delayed invocations", (done: () => void) => {
    let i = 0;
    const increment = throttle(() => {
      i++;
    }, 100);

    expect(i).toBe(0);
    increment();
    expect(i).toBe(1);

    setTimeout(() => {
      increment();
      expect(i).toBe(1);
    }, 25);

    setTimeout(() => {
      increment();
      expect(i).toBe(1);
      done();
    }, 50);
  });

  test("uses arguments", () => {
    let i = 21;
    const increment = throttle<unknown, [number, number]>((a, b) => {
      i += a * b;
    }, 50);

    expect(i).toBe(21);
    increment(3, 7);
    expect(i).toBe(42);
  });

  test("can be called again after first throttling window", (done: () => void) => {
    let i = 0;
    const increment = throttle(() => {
      i++;
    }, 100);

    expect(i).toBe(0);
    increment();
    expect(i).toBe(1);

    // Should not fire yet.
    setTimeout(() => {
      expect(i).toBe(1);
      increment();
      expect(i).toBe(1);
    }, 50);

    setTimeout(() => {
      expect(i).toBe(1);
      increment();
      expect(i).toBe(2);
    }, 150);

    setTimeout(() => {
      expect(i).toBe(2);
      increment();
      expect(i).toBe(2);
      done();
    }, 200);
  });

  test("callbacks can access `this`", (done: () => void) => {
    const increment = throttle<{ val: number }, [number]>(function (delta) {
      this.val += delta;
    }, 50);

    const obj = {
      val: 2,
      increment,
    };

    expect(obj.val).toBe(2);
    obj.increment(3);
    expect(obj.val).toBe(5);

    setTimeout(() => {
      obj.increment(10);
      expect(obj.val).toBe(15);
      done(); // Keep original done
    }, 100);
  });
});
