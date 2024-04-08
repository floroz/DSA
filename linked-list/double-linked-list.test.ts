import { describe, it, expect } from "vitest";

class DoubleLinkListNode<T> {
  constructor(
    public value: T,
    public prev?: DoubleLinkListNode<T>,
    public next?: DoubleLinkListNode<T>
  ) {}
}

class DoubleLinkList<T> {
  head?: DoubleLinkListNode<T>;
  tail?: DoubleLinkListNode<T>;
  size = 0;

  /**
   * O(1) time complexity
   */
  append(value: T): void {
    this.size++;

    const node = new DoubleLinkListNode(value);

    if (!this.head || !this.tail) {
      this.head = this.tail = node;
      return;
    }

    this.tail.next = node;
    node.prev = this.tail;
    this.tail = node;

    return;
  }

  prepend(value: T): void {
    this.size++;

    const node = new DoubleLinkListNode(value);

    if (!this.head || !this.tail) {
      this.head = this.tail = node;
      return;
    }

    node.next = this.head;
    this.head.prev = node;
    this.head = node;
  }

  /**
   * O(1) time complexity
   */
  deleteLast(): DoubleLinkListNode<T> | undefined {
    if (this.size > 0) {
      this.size--;
    }

    if (!this.tail || !this.head) {
      return undefined;
    }

    let deletedNode = this.tail;
    let previousNode = this.tail.prev;

    if (previousNode) {
      previousNode.next = undefined;
    }

    this.tail = previousNode;
    return deletedNode;
  }

  /**
   * O(1) time complexity
   */
  deleteFirst(): DoubleLinkListNode<T> | undefined {
    if (this.size > 0) {
      this.size--;
    }

    if (!this.head) {
      return undefined;
    }

    const node = this.head;
    const nextNode = node.next;

    if (nextNode) {
      nextNode.prev = undefined;
    }

    this.head = nextNode;
    node.next = undefined;
    return node;
  }

  /**
   * O(n) time complexity
   */
  at(index: number): DoubleLinkListNode<T> | undefined {
    if (index >= this.size || index < 0) {
      return undefined;
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

    if (!this.head || index === 0) {
      return this.prepend(value);
    } else if (index === this.size - 1) {
      return this.append(value);
    }

    let node: DoubleLinkListNode<T> | undefined = this.head;
    let count = 0;

    while (node && count < index) {
      node = node.next;
      count++;
    }

    if (!node) return;

    const prev = node.prev!;
    const next = node.next;

    const insert = new DoubleLinkListNode(value, prev, next);

    prev.next = insert;

    if (next) {
      next.prev = insert;
    }
  }
}

describe("Double Linked List", () => {
  it("should be able to create a linked list", () => {
    const linkedList = new DoubleLinkList();
    expect(linkedList).toBeInstanceOf(DoubleLinkList);
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();
  });

  it("should be able to add a node to the linked list", () => {
    const linkedList = new DoubleLinkList<number>();

    linkedList.append(1);

    expect(linkedList.head?.value).toBe(1);
    expect(linkedList.head?.prev).toBeNull();
    expect(linkedList.head?.next).toBeNull();
    expect(linkedList.tail?.value).toBe(1);
    expect(linkedList.tail?.prev).toBeNull();
    expect(linkedList.tail?.next).toBeNull();

    linkedList.append(2);

    expect(linkedList.head?.value).toBe(1);
    expect(linkedList.head?.prev).toBeNull();
    expect(linkedList.head?.next?.value).toBe(2);
    expect(linkedList.head?.next?.prev?.value).toBe(1);
    expect(linkedList.head?.next?.next).toBeNull();
    expect(linkedList.tail?.value).toBe(2);
    expect(linkedList.tail?.prev?.value).toBe(1);
    expect(linkedList.tail?.next).toBeNull();
  });

  it("should set the correct references for the .next and .prev properties when adding a node", () => {
    const linkedList = new DoubleLinkList<number>();

    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);

    expect(linkedList.head?.next?.value).toBe(2);
    expect(linkedList.head?.next?.prev?.value).toBe(1);
    expect(linkedList.head?.next?.next?.value).toBe(3);
    expect(linkedList.head?.next?.next?.prev?.value).toBe(2);
    expect(linkedList.head?.next?.next?.next).toBeNull();
    expect(linkedList.head?.next?.next?.prev?.prev?.value).toBe(1);
    expect(linkedList.tail?.value).toBe(3);
    expect(linkedList.tail?.prev?.value).toBe(2);
    expect(linkedList.tail?.next).toBeNull();
  });

  it("should be able to pop the last node from the linked list", () => {
    const linkedList = new DoubleLinkList<number>();

    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);

    const poppedNode = linkedList.deleteLast();

    expect(poppedNode?.value).toBe(3);
    expect(poppedNode?.prev?.value).toBe(2);
    expect(linkedList.head?.next?.next).toBeNull();
    expect(linkedList.tail?.value).toBe(2);
    expect(linkedList.tail?.prev?.value).toBe(1);
    expect(linkedList.tail?.next).toBeNull();
  });

  it("should be able to remove the first node from the linked list", () => {
    const linkedList = new DoubleLinkList<number>();

    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);

    const removedNode = linkedList.deleteFirst();

    expect(removedNode?.value).toBe(1);
    expect(removedNode?.prev).toBeNull();
    expect(linkedList.head?.value).toBe(2);
    expect(linkedList.head?.prev).toBeNull();
    expect(linkedList.head?.next?.value).toBe(3);
    expect(linkedList.head?.next?.prev?.value).toBe(2);
    expect(linkedList.tail?.value).toBe(3);
    expect(linkedList.tail?.prev?.value).toBe(2);
    expect(linkedList.tail?.next).toBeNull();
  });

  it("should be able to access a node at a given index", () => {
    const linkedList = new DoubleLinkList<number>();

    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);

    expect(linkedList.at(0)?.value).toBe(1);
    expect(linkedList.at(1)?.value).toBe(2);
    expect(linkedList.at(2)?.value).toBe(3);
    expect(linkedList.at(3)).toBeNull();
  });

  it("should be able to insert a node at a given index", () => {
    const linkedList = new DoubleLinkList<number>();

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

  it("should prepend a node to the linked list", () => {
    const linkedList = new DoubleLinkList<number>();

    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);

    linkedList.prepend(0);

    expect(linkedList.head?.value).toBe(0);
    expect(linkedList.head?.next?.value).toBe(1);
    expect(linkedList.head?.next?.next?.value).toBe(2);
    expect(linkedList.head?.next?.next?.next?.value).toBe(3);
  });
});
