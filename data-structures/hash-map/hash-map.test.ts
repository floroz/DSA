/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it } from "vitest";

class HashMap {
  private readonly MIN_SIZE = 10;
  private storage: any[] = new Array(this.MIN_SIZE).fill(null);
  private size = 0;

  private get loadFactor(): number {
    return this.size / this.storage.length;
  }

  private hash(key: string): number {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * i) % this.storage.length;
    }
    return hash;
  }

  private resize(): void {
    const newStorage = new Array(this.storage.length * 2).fill(null);
    this.storage.forEach((bucket) => {
      if (!bucket) {
        return;
      }
      bucket.forEach(([key, value]: [string, any]) => {
        const index = this.hash(key);
        if (!newStorage[index]) {
          newStorage[index] = [];
        }
        newStorage[index].push([key, value]);
      });
    });
    this.storage = newStorage;
  }

  private downsize(): void {
    const newStorage = new Array(this.storage.length / 2).fill(null);
    this.storage.forEach((bucket) => {
      if (!bucket) {
        return;
      }
      bucket.forEach(([key, value]: [string, any]) => {
        const index = this.hash(key);
        if (!newStorage[index]) {
          newStorage[index] = [];
        }
        newStorage[index].push([key, value]);
      });
    });
    this.storage = newStorage;
  }

  set(key: string, value: any): void {
    const index = this.hash(key);
    if (!this.storage[index]) {
      this.storage[index] = [];
    }
    this.storage[index].push([key, value]);
    this.size++;

    if (this.loadFactor > 0.7) {
      this.resize();
    } else if (this.loadFactor < 0.2 && this.storage.length > this.MIN_SIZE) {
      this.downsize();
    }
  }

  get(key: string): any {
    const index = this.hash(key);
    if (!this.storage[index]) {
      return null;
    }
    for (let i = 0; i < this.storage[index].length; i++) {
      if (this.storage[index][i][0] === key) {
        return this.storage[index][i][1];
      }
    }
    return null;
  }
}

describe("HashMap", () => {
  it("should set and get values", () => {
    const hashMap = new HashMap();
    hashMap.set("foo", "bar");
    hashMap.set("fizz", "buzz");
    expect(hashMap.get("foo")).toBe("bar");
    expect(hashMap.get("fizz")).toBe("buzz");
  });

  it("should handle collisions", () => {
    const hashMap = new HashMap();
    hashMap.set("foo", "bar");
    hashMap.set("oof", "rab");
    expect(hashMap.get("foo")).toBe("bar");
    expect(hashMap.get("oof")).toBe("rab");
  });
});
