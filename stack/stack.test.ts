import { describe, expect, it } from "vitest";

class StackNode<T> {
  constructor(
    public value: T,
    public next?: StackNode<T>
  ) {}
}

class Stack<T> {
  head?: StackNode<T>;
  size = 0;

  push(value: T): void {
    this.size++;

    if (!this.head) {
      this.head = new StackNode(value);
      return;
    }

    const next = this.head;
    this.head = new StackNode(value, next);
    return;
  }
  pop(): T | undefined {
    if (this.size > 0) {
      this.size--;
    }

    if (this.size === 0) {
      const head = this.head;
      this.head = undefined;
      return head?.value;
    }

    const popped = this.head;

    this.head = popped?.next;
    return popped?.value;
  }

  peek(): T | undefined {
    return this.head?.value;
  }
}

describe("Stack", () => {
  it("should push elements to the stack", () => {
    const stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    stack.push(3);

    expect(stack.size).toBe(3);

    expect(stack.head?.value).toBe(3);
    expect(stack.head?.next?.value).toBe(2);
    expect(stack.head?.next?.next?.value).toBe(1);
  });

  it("should pop elements from the stack", () => {
    const stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    stack.push(3);

    expect(stack.pop()).toBe(3);
    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
    expect(stack.pop()).toBe(null);
  });

  it("should return null if the stack is empty", () => {
    const stack = new Stack<number>();
    expect(stack.pop()).toBe(null);
  });

  it("should handle pop when only the head is present", () => {
    const stack = new Stack<number>();
    stack.push(1);

    expect(stack.pop()).toBe(1);
    expect(stack.pop()).toBe(null);
  });

  it("should peek the top element of the stack", () => {
    const stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    stack.push(3);

    expect(stack.peek()).toBe(3);
    stack.pop();
    expect(stack.peek()).toBe(2);
    stack.pop();
    expect(stack.peek()).toBe(1);
    stack.pop();
    expect(stack.peek()).toBe(null);
  });
});
