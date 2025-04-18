import { describe, expect, it } from "vitest";

/**
 * Doubly Linked List Node
 */
class LRUNode<V> {
  value: V;
  prev: LRUNode<V> | null = null;
  next: LRUNode<V> | null = null;

  constructor(value: V) {
    this.value = value;
  }
}

/**
 * Least Recently Used Cache
 */
class LRU<K, V> {
  private size = 0;
  private capacity: number;
  private head: LRUNode<V> | null = null;
  private tail: LRUNode<V> | null = null;
  /**
   * Cache Storage
   */
  private cache: Map<K, LRUNode<V>> = new Map();
  /**
   * Reverse Lookup to store deleted items to prevent memory leaks
   */
  private reverseCache: Map<LRUNode<V>, K> = new Map();

  constructor(capacity: number = 10) {
    this.capacity = capacity;
  }

  private detach(node: LRUNode<V>): void {
    if (node.prev) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev;
    }
  }

  private prepend(node: LRUNode<V>): void {
    if (this.head) {
      this.head.prev = node;
      node.next = this.head;
    }
    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }
  }

  private trimCache(): void {
    if (this.size > this.capacity) {
      const node = this.tail;
      if (!node) {
        return;
      }
      this.cache.delete(this.reverseCache.get(node)!);
      this.reverseCache.delete(node);
      this.detach(node);
      this.size--;
    }
  }

  get(key: K): V | undefined {
    const node = this.cache.get(key);
    if (!node) {
      return undefined;
    }

    this.detach(node);
    this.prepend(node);

    return node.value;
  }

  put(key: K, value: V): void {
    const node = this.cache.get(key);

    if (node) {
      node.value = value;
      this.detach(node);
      this.prepend(node);
    } else {
      const newNode = new LRUNode(value);
      this.cache.set(key, newNode);
      this.prepend(newNode);
      this.size++;
    }

    this.trimCache();
  }
}

describe("LRU", () => {
  it("should store and retrieve values", () => {
    const lru = new LRU<string, number>(3);
    lru.put("a", 1);
    lru.put("b", 2);
    lru.put("c", 3);

    expect(lru.get("a")).toBe(1);
    expect(lru.get("b")).toBe(2);
    expect(lru.get("c")).toBe(3);
  });

  it.skip("should evict least recently used items", () => {
    const lru = new LRU<string, number>(3);
    lru.put("a", 1);
    lru.put("b", 2);
    lru.put("c", 3);
    lru.put("d", 4);

    expect(lru.get("a")).toBe(undefined);
    expect(lru.get("b")).toBe(2);
    expect(lru.get("c")).toBe(3);
    expect(lru.get("d")).toBe(4);
  });

  it("should update values", () => {
    const lru = new LRU<string, number>(3);
    lru.put("a", 1);
    lru.put("b", 2);
    lru.put("c", 3);
    lru.put("b", 4);

    expect(lru.get("a")).toBe(1);
    expect(lru.get("b")).toBe(4);
    expect(lru.get("c")).toBe(3);
  });
});
