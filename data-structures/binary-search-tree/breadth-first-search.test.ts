import { describe, it, expect } from "vitest";

class BSTNode<T> {
  constructor(
    public value: T,
    public left?: BSTNode<T>,
    public right?: BSTNode<T>
  ) {}
}

function breadthFirstSearch<T>(
  tree: BSTNode<T> | undefined | null,
  visitor: (node?: T) => void
) {
  if (!tree) {
    return;
  }

  const queue = [tree];

  while (queue.length) {
    const node = queue.shift();

    if (!node) return;

    visitor(node?.value);

    if (node.left) {
      queue.push(node.left);
    }

    if (node.right) {
      queue.push(node.right);
    }
  }
}

describe("Binary Search Tree - Breadth First Search", () => {
  it("should traverse a simple tree in breadth first search order", () => {
    const tree = new BSTNode(1);
    tree.left = new BSTNode(2);
    tree.right = new BSTNode(3);

    const result: number[] = [];

    breadthFirstSearch(tree, (value) => (value ? result.push(value) : null));

    expect(result).toEqual([1, 2, 3]);
  });
  it("should traverse the tree in breadth first search order", () => {
    const tree = new BSTNode(1);
    tree.left = new BSTNode(2);
    tree.right = new BSTNode(3);
    tree.left.left = new BSTNode(4);
    tree.left.right = new BSTNode(5);
    tree.right.left = new BSTNode(6);
    tree.right.right = new BSTNode(7);

    const result: number[] = [];

    breadthFirstSearch(tree, (value) => (value ? result.push(value) : null));

    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
});
