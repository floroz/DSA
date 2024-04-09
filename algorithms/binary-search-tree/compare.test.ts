import { describe, expect, it } from "vitest";
import { BSTNode } from "../../data-structures/binary-search-tree/bst-node";

function compare<T>(
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

  let left = compare(node1.left, node2.left);
  let right = compare(node1.right, node2.right);

  return left && right;
}

describe("compare", () => {
  it("should return true for same trees", () => {
    expect(
      compare(
        new BSTNode(1, new BSTNode(2), new BSTNode(3)),
        new BSTNode(1, new BSTNode(2), new BSTNode(3))
      )
    ).toBe(true);

    expect(
      compare(
        new BSTNode(1, new BSTNode(2), new BSTNode(3)),
        new BSTNode(1, new BSTNode(2), new BSTNode(4))
      )
    ).toBe(false);

    expect(
      compare(
        new BSTNode(1, new BSTNode(2), new BSTNode(3)),
        new BSTNode(1, new BSTNode(2))
      )
    ).toBe(false);

    expect(
      compare(
        new BSTNode(1, new BSTNode(2)),
        new BSTNode(1, new BSTNode(2), new BSTNode(3))
      )
    ).toBe(false);

    expect(
      compare(
        new BSTNode(1, new BSTNode(2), new BSTNode(3)),
        new BSTNode(1, new BSTNode(2), new BSTNode(3, new BSTNode(4)))
      )
    ).toBe(false);
  });
});
