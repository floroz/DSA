/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, test } from "vitest";

type EventName = string;
type AnyFunction<T extends any[] = any> = (...args: T) => void;

interface IEventEmitter {
  on(eventName: EventName, listener: AnyFunction): IEventEmitter;
  off(eventName: EventName, listener: AnyFunction): IEventEmitter;
  emit(eventName: EventName, ...args: unknown[]): boolean;
}

export default class EventEmitter implements IEventEmitter {
  subs: Map<EventName, AnyFunction[]>;
  constructor() {
    this.subs = new Map();
  }

  on(eventName: EventName, listener: AnyFunction): IEventEmitter {
    if (!this.subs.has(eventName)) {
      this.subs.set(eventName, [listener]);
    } else {
      const listeners = this.subs.get(eventName)!;

      listeners.push(listener);
    }
    return this;
  }

  off(eventName: EventName, listener: AnyFunction): IEventEmitter {
    const listeners = this.subs.get(eventName);
    if (listeners) {
      const firstOccurance = listeners.findIndex((l) => l === listener);

      if (firstOccurance !== -1) {
        listeners.splice(firstOccurance, 1);

        // Clean up empty event arrays
        if (listeners.length === 0) {
          this.subs.delete(eventName);
        }
      }
    }

    return this;
  }

  emit(eventName: EventName, ...args: unknown[]): boolean {
    const listeners = this.subs.get(eventName);

    if (!listeners || listeners.length === 0) {
      return false;
    }

    listeners.forEach((l) => l(...args));

    return true;
  }
}

describe("EventEmitter", () => {
  test("constructor", () => {
    const emitter = new EventEmitter();
    expect(emitter).toBeInstanceOf(EventEmitter);
  });

  describe("methods can be chained", () => {
    test("on() can be chained", () => {
      const emitter = new EventEmitter();
      emitter.on("foo", () => {}).on("foo", () => {});
    });

    test("off() can be chained", () => {
      const emitter = new EventEmitter();
      emitter.off("foo", () => {}).off("foo", () => {});
    });
  });

  describe("subscribe", () => {
    test("single listener", () => {
      const emitter = new EventEmitter();
      let a = 0;
      emitter.on("foo", () => {
        a = 1;
      });
      emitter.emit("foo");

      expect(a).toBe(1);
    });

    test("multiple listeners", () => {
      const emitter = new EventEmitter();
      let a = 0,
        b = 1;
      emitter.on("foo", () => {
        a = 1;
      });
      emitter.on("foo", () => {
        b = 3;
      });
      emitter.emit("foo");

      expect(a).toBe(1);
      expect(b).toBe(3);
    });

    test("multiple events", () => {
      const emitter = new EventEmitter();
      let a = 0,
        b = 1;
      emitter.on("foo", () => {
        a = 1;
      });
      emitter.on("bar", () => {
        b = 3;
      });
      emitter.emit("foo");
      expect(a).toBe(1);
      expect(b).toBe(1);

      emitter.emit("bar");
      expect(b).toBe(3);
    });

    test("same listener added multiple times", () => {
      const emitter = new EventEmitter();

      let num = 1;
      function double() {
        num *= 2;
      }

      emitter.on("double", double);
      emitter.emit("double");
      expect(num).toBe(2);

      emitter.on("double", double);
      emitter.emit("double");
      expect(num).toBe(8);
    });
  });

  describe("emit", () => {
    test("existing event returns true", () => {
      const emitter = new EventEmitter();

      emitter.on("foo", () => {});
      expect(emitter.emit("foo")).toBe(true);
    });

    describe("listeners are invoked with arguments", () => {
      test("single argument", () => {
        const emitter = new EventEmitter();

        let sum = 0;
        emitter.on("foo", (a: number) => {
          sum = a;
        });
        emitter.emit("foo", 3);
        expect(sum).toBe(3);

        emitter.emit("foo", 5);
        expect(sum).toBe(5);
      });

      test("two arguments", () => {
        const emitter = new EventEmitter();

        let sum = 0;
        emitter.on("foo", (a: number, b: number) => {
          sum = a + b;
        });
        emitter.emit("foo", 3, 5);
        expect(sum).toBe(8);

        emitter.emit("foo", 4, 13);
        expect(sum).toBe(17);
      });

      test("three arguments", () => {
        const emitter = new EventEmitter();

        let product = 0;
        emitter.on("foo", (a: number, b: number, c: number) => {
          product = a * b * c;
        });
        emitter.emit("foo", 3, 5, 6);
        expect(product).toBe(90);

        emitter.emit("foo", 4, 13, 9);
        expect(product).toBe(468);
      });
    });

    describe("non-existing event name returns false", () => {
      test("custom event", () => {
        const emitter = new EventEmitter();

        expect(emitter.emit("foo")).toBe(false);
      });

      test("same name as built-in event", () => {
        const emitter = new EventEmitter();

        expect(emitter.emit("toString")).toBe(false);
      });
    });
  });

  describe("unsubscribe", () => {
    test("single listener", () => {
      const emitter = new EventEmitter();

      let sum = 0;
      function addTwoNumbers(a: number, b: number) {
        sum = a + b;
      }
      emitter.on("foo", addTwoNumbers);
      expect(emitter.emit("foo", 2, 5)).toBe(true);
      expect(sum).toBe(7);

      emitter.off("foo", addTwoNumbers);
      expect(emitter.emit("foo", -3, 9)).toBe(false);
      expect(sum).toBe(7);
    });

    test("multiple listeners", () => {
      const emitter = new EventEmitter();

      let sum = 0;
      function addTwoNumbers(a: number, b: number) {
        sum = a + b;
      }
      emitter.on("foo", addTwoNumbers);
      expect(emitter.emit("foo", 2, 5)).toBe(true);
      expect(sum).toBe(7);

      let product = 0;
      function multiplyTwoNumbers(a: number, b: number) {
        product = a * b;
      }
      emitter.on("foo", multiplyTwoNumbers);
      expect(emitter.emit("foo", 4, 5)).toBe(true);
      expect(sum).toBe(9);
      expect(product).toBe(20);

      emitter.off("foo", addTwoNumbers);
      expect(emitter.emit("foo", -3, 9)).toBe(true);
      expect(sum).toBe(9);
      expect(product).toBe(-27);

      emitter.off("foo", multiplyTwoNumbers);
      expect(emitter.emit("foo", 3, 7)).toBe(false);
      expect(sum).toBe(9);
      expect(product).toBe(-27);
    });

    test("multiple events", () => {
      const emitter = new EventEmitter();

      let sum = 0;
      function addTwoNumbers(a: number, b: number) {
        sum = a + b;
      }
      emitter.on("foo", addTwoNumbers);
      expect(emitter.emit("foo", 2, 5)).toBe(true);
      expect(sum).toBe(7);

      expect(emitter.emit("bar", 3, 7)).toBe(false);
      emitter.on("bar", addTwoNumbers);
      expect(emitter.emit("bar", 3, 7)).toBe(true);
      expect(sum).toBe(10);

      emitter.off("foo", addTwoNumbers);
      expect(emitter.emit("foo", -3, 9)).toBe(false);
      expect(sum).toBe(10);

      emitter.off("bar", addTwoNumbers);
      expect(emitter.emit("bar", -3, 9)).toBe(false);
      expect(sum).toBe(10);
    });

    test("same listener added multiple times removed correctly", () => {
      const emitter = new EventEmitter();

      let num = 1;
      function double() {
        num *= 2;
      }

      emitter.on("double", double);
      emitter.emit("double");
      expect(num).toBe(2);

      emitter.on("double", double);
      emitter.emit("double");
      expect(num).toBe(8);

      emitter.off("double", double);
      emitter.emit("double");
      expect(num).toBe(16);

      emitter.off("double", double);
      emitter.emit("double");
      expect(num).toBe(16);
    });
  });
});
