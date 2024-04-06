import { describe, it, expect } from "vitest";

class LinkedListNode<T> {
  constructor(public value: T | null, public next: LinkedListNode<T> | null) {}
}

class LinkedList<T> {
  head: LinkedListNode<T> | null = null;
  tail: LinkedListNode<T> | null = null;
  size = 0;

  /**
   * O(1) time complexity
   */
  append(value: T): void {
    this.size++;
    const insert = new LinkedListNode(value, null);

    if (this.head == null) {
      this.head = insert;
      this.tail = insert;
      return;
    }

    let node = this.head;

    while (node.next) {
      node = node.next;
    }

    node.next = insert;
    this.tail = insert;
  }

  /**
   * O(n) time complexity
   */
  deleteLast(): LinkedListNode<T> | null {
    if (this.size > 0) {
      this.size--;
    }

    if (!this.head) {
      return null;
    }

    let node = this.head;

    while (node.next?.next) {
      node = node.next;
    }
    let tmp = node.next;

    node.next = null;
    this.tail = node;

    return tmp;
  }

  /**
   * O(1) time complexity
   */
  deleteFirst(): LinkedListNode<T> | null {
    if (this.size > 0) {
      this.size--;
    }

    if (!this.head) {
      return null;
    }

    if (!this.head.next) {
      let tmp = this.head;
      this.head = null;
      return tmp;
    }

    const tmp = this.head;
    this.head = tmp.next;
    return tmp;
  }

  /**
   * O(n) time complexity
   */
  at(index: number): LinkedListNode<T> | null {
    if (index >= this.size || index < 0) {
      return null;
    }

    let node = this.head;
    let count = 0;

    while (node && count < index) {
      node = node.next;
      count++;
    }

    return node;
  }

  /**
   * O(n)
   */
  insertAt(index: number, value: T): void {
    if (index >= this.size || index < 0) {
      return;
    }

    if (!this.head) {
      return this.append(value);
    }

    let count = 0;
    let prev: LinkedListNode<T> | null = null;
    let node: LinkedListNode<T> | null = this.head;

    while (node && count < index) {
      count++;
      prev = node;
      node = node.next;
    }

    const insert = new LinkedListNode(value, node?.next ?? null);
    prev!.next = insert;
  }
}

describe("linked list", () => {
  it("should be able to create a linked list", () => {
    const linkedList = new LinkedList();
    expect(linkedList).toBeInstanceOf(LinkedList);
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();
  });

  it("should be able to add a node to the linked list", () => {
    const linkedList = new LinkedList<number>();
    linkedList.append(1);
    expect(linkedList.head?.value).toBe(1);
    expect(linkedList.tail?.value).toBe(1);
  });

  it("should set the correct references for the .next property when adding a node", () => {
    const linkedList = new LinkedList<number>();
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    expect(linkedList.head?.next?.value).toBe(2);
    expect(linkedList.head?.next?.next?.value).toBe(3);
    expect(linkedList.head?.next?.next?.next).toBeNull();
    expect(linkedList.tail?.value).toBe(3);
  });

  it("should be able to pop the last node from the linked list", () => {
    const linkedList = new LinkedList<number>();
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    const poppedNode = linkedList.deleteLast();
    expect(poppedNode?.value).toBe(3);
    expect(linkedList.head?.next?.next).toBeNull();
    expect(linkedList.tail?.value).toBe(2);
  });

  it("should be able to remove the first node from the linked list", () => {
    const linkedList = new LinkedList<number>();
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    const removedNode = linkedList.deleteFirst();
    expect(removedNode?.value).toBe(1);
    expect(linkedList.head?.value).toBe(2);
    expect(linkedList.head?.next?.value).toBe(3);
    expect(linkedList.tail?.value).toBe(3);
  });

  it("should be able to access a node at a given index", () => {
    const linkedList = new LinkedList<number>();

    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);

    expect(linkedList.at(0)?.value).toBe(1);
    expect(linkedList.at(1)?.value).toBe(2);
    expect(linkedList.at(2)?.value).toBe(3);
    expect(linkedList.at(3)).toBeNull();
  });

  it("should be able to insert a node at a given index", () => {
    const linkedList = new LinkedList<number>();

    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);

    linkedList.insertAt(1, 4); // replace 2 with 4

    expect(linkedList.head?.value).toBe(1);
    expect(linkedList.head?.next?.value).toBe(4);
    expect(linkedList.head?.next?.next?.value).toBe(3);

    expect(linkedList.at(0)?.value).toBe(1);
    expect(linkedList.at(1)?.value).toBe(4);
    expect(linkedList.at(2)?.value).toBe(3);
    expect(linkedList.at(3)).toBeNull();
  });
});
