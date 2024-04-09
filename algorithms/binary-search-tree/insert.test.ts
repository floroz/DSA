import { describe, expect, it } from "vitest";

class BSTNode<T> {
  constructor(
    public value: T,
    public left?: BSTNode<T>,
    public right?: BSTNode<T>
  ) {}
}

/**
 * Time complexity: O(h) where h is the height of the tree
 */
function insert<T>(root: BSTNode<T>, node: BSTNode<T>) {
  if (node.value > root.value) {
    if (!root.right) {
      root.right = node;
      return;
    }
    // go right
    return insert(root.right, node);
  } else {
    if (!root.left) {
      root.left = node;
      return;
    }
    // go left
    return insert(root.left, node);
  }
}

describe("insert", () => {
  it("should insert node to BST", () => {
    const root = new BSTNode(5);

    insert(root, new BSTNode(3));
    insert(root, new BSTNode(7));
    insert(root, new BSTNode(2));
    insert(root, new BSTNode(4));
    insert(root, new BSTNode(6));
    insert(root, new BSTNode(8));
    expect(root).toMatchObject({
      value: 5,
      left: {
        value: 3,
        left: {
          value: 2,
        },
        right: {
          value: 4,
        },
      },
      right: {
        value: 7,
        left: {
          value: 6,
        },
        right: {
          value: 8,
        },
      },
    });
  });

  it("should insert node to BST", () => {
    const root = new BSTNode(5);

    insert(root, new BSTNode(3));
    insert(root, new BSTNode(7));
    insert(root, new BSTNode(2));
    insert(root, new BSTNode(4));
    insert(root, new BSTNode(6));
    insert(root, new BSTNode(8));
    insert(root, new BSTNode(1));
    insert(root, new BSTNode(9));
    expect(root).toMatchObject({
      value: 5,
      left: {
        value: 3,
        left: {
          value: 2,
          left: {
            value: 1,
          },
        },
        right: {
          value: 4,
        },
      },
      right: {
        value: 7,
        left: {
          value: 6,
        },
        right: {
          value: 8,
          right: {
            value: 9,
          },
        },
      },
    });
  });
});
