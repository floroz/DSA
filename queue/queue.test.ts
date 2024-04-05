import { describe, expect, it } from "vitest";

class QueueNode<T> {
    constructor(public value: T | null, public next: QueueNode<T> | null) {}
}

class Queue<T> {
    head: QueueNode<T> | null = null;
    tail: QueueNode<T> | null = null;
    size = 0;

    enqueue(value: T): void {
        this.size++;
        const node = new QueueNode(value, null);

        if (!this.tail) {
            this.tail = node
            this.head = this.tail
            return;
        } 

         this.tail.next = node
         this.tail = node;
   
    }

    dequeue(): T | null {
        if (!this.head) {
            return null;
        }

        const head = this.head;
        this.head = head.next;
        this.size--;
        // fake manual garbage collection operation - free up memory
        head.next = null;

        return head.value;
    }

    peek(): T | null {
        return this.head?.value ?? null
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

        expect(poppedElement).toBeNull();
    });

    it("should have correct memory references", () => {
        const queue = new Queue<number>();
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);

        expect(queue.head?.value).toBe(1);
        expect(queue.head?.next?.value).toBe(2);
        expect(queue.head?.next?.next?.value).toBe(3);
        expect(queue.head?.next?.next?.next).toBeNull();
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
