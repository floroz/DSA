import { describe, expect, it } from "vitest";

class QueueNode<T> {
  constructor(
    public value: T,
    public next?: QueueNode<T>
  ) {}
}

class Queue<T> {
  head?: QueueNode<T>;
  tail?: QueueNode<T>;
  size = 0;

  enqueue(value: T): void {
    this.size++;
    const node = new QueueNode(value);

    if (!this.tail) {
      this.tail = node;
      this.head = this.tail;
      return;
    }

    this.tail.next = node;
    this.tail = node;
  }

  dequeue(): T | undefined {
    if (!this.head) {
      return;
    }

    const head = this.head;
    this.head = head.next;
    this.size--;
    // fake manual garbage collection operation - free up memory
    head.next = undefined;

    return head.value;
  }

  peek(): T | undefined {
    return this.head?.value;
  }
}

describe("Queue", () => {
  it("should push elements to the queue", () => {
    const queue = new Queue<number>();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue.size).toBe(3);
  });

  it("should pop elements from the queue", () => {
    const queue = new Queue<number>();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    const value = queue.dequeue();

    expect(value).toBe(1);
    expect(queue.size).toBe(2);
  });

  it("should return null when popping from an empty queue", () => {
    const queue = new Queue<number>();

    const poppedElement = queue.dequeue();

    expect(poppedElement).toBeUndefined();
  });

  it("should have correct memory references", () => {
    const queue = new Queue<number>();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue.head?.value).toBe(1);
    expect(queue.head?.next?.value).toBe(2);
    expect(queue.head?.next?.next?.value).toBe(3);
    expect(queue.head?.next?.next?.next).toBeUndefined();
  });

  it("should return the head element without removing it", () => {
    const queue = new Queue<number>();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    const value = queue.peek();

    expect(value).toBe(1);
    expect(queue.size).toBe(3);
  });
});
