import { describe, expect, it } from "vitest";

class BSTNode<T> {
  constructor(
    public value: T,
    public left?: BSTNode<T>,
    public right?: BSTNode<T>
  ) {}
}

function isSameBinaryTree<T>(
  node1: BSTNode<T> | undefined,
  node2: BSTNode<T> | undefined
): boolean {
  if (!node1 && !node2) {
    return true;
  }

  if (!node1 || !node2) {
    return false;
  }

  if (node1.value !== node2.value) {
    return false;
  }

  let left = isSameBinaryTree(node1.left, node2.left);
  let right = isSameBinaryTree(node1.right, node2.right);

  return left && right;
}

describe("isSameTree", () => {
  it("should return true for same trees", () => {
    expect(
      isSameBinaryTree(
        new BSTNode(1, new BSTNode(2), new BSTNode(3)),
        new BSTNode(1, new BSTNode(2), new BSTNode(3))
      )
    ).toBe(true);

    expect(
      isSameBinaryTree(
        new BSTNode(1, new BSTNode(2), new BSTNode(3)),
        new BSTNode(1, new BSTNode(2), new BSTNode(4))
      )
    ).toBe(false);

    expect(
      isSameBinaryTree(
        new BSTNode(1, new BSTNode(2), new BSTNode(3)),
        new BSTNode(1, new BSTNode(2))
      )
    ).toBe(false);

    expect(
      isSameBinaryTree(
        new BSTNode(1, new BSTNode(2)),
        new BSTNode(1, new BSTNode(2), new BSTNode(3))
      )
    ).toBe(false);

    expect(
      isSameBinaryTree(
        new BSTNode(1, new BSTNode(2), new BSTNode(3)),
        new BSTNode(1, new BSTNode(2), new BSTNode(3, new BSTNode(4)))
      )
    ).toBe(false);
  });
});
