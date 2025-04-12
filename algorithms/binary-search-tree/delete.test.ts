import { describe, expect, it } from "vitest";
import { BSTNode } from "../../data-structures/binary-search-tree/bst-node";

function smallestNode<T>(root: BSTNode<T>): BSTNode<T> {
  let current = root;
  while (current.left) {
    current = current.left;
  }
  return current;
}

function deleteNode<T>(
  root: BSTNode<T> | null,
  value: T,
  parent: BSTNode<T> | null = null,
  direction: "left" | "right" | null = null
) {
  if (!root) {
    return;
  }

  if (value < root.value) {
    deleteNode(root.left!, value, root, "left");
  } else if (value > root.value) {
    deleteNode(root.right!, value, root, "right");
  } else {
    // no children
    if (!root.left && !root.right) {
      if (parent && direction) {
        parent[direction] = undefined;
        // delete root; // cleanup memory
      } else {
        root.value = undefined as T;
        // or
        // delete root; // cleanup memory
      }

      return;
    }

    // only left
    if (!root.left) {
      if (parent && direction) {
        parent[direction] = root.right;
      }
      return;
    }

    // only right
    if (!root.right) {
      if (parent && direction) {
        parent[direction] = root.left;
      }
      return;
    }

    // both children - find the smallest on the right and swap to delete a leaf node
    const smallest = smallestNode(root.right);
    root.value = smallest.value;
    deleteNode(root.right, smallest.value, root, "right");
  }
}

describe("delete BST node", () => {
  it("should delete node from BST", () => {
    const root = new BSTNode(5);
    deleteNode(root, 5);
    expect(root.value).toBeUndefined();
    expect(root).toMatchInlineSnapshot(`
      BSTNode {
        "left": undefined,
        "right": undefined,
        "value": undefined,
      }
    `);
  });

  it("should delete node without children", () => {
    const root = new BSTNode(5, new BSTNode(3), new BSTNode(7));

    deleteNode(root, 3);
    expect(root.left).toBeUndefined();
  });

  it("should delete a node with only right child", () => {
    /**
     *    5
     *  3   7
     * x 4  x x
     */
    const root = new BSTNode(
      5,
      new BSTNode(3, undefined, new BSTNode(4)),
      new BSTNode(7)
    );

    expect(root.value).toBe(5);
    expect(root.left?.value).toBe(3);
    expect(root.left?.right?.value).toBe(4);
    deleteNode(root, 3);
    expect(root.left?.value).toBe(4);
    expect(root.left?.left).toBe(undefined);
    expect(root).toMatchInlineSnapshot(`
      BSTNode {
        "left": BSTNode {
          "left": undefined,
          "right": undefined,
          "value": 4,
        },
        "right": BSTNode {
          "left": undefined,
          "right": undefined,
          "value": 7,
        },
        "value": 5,
      }
    `);
  });

  it("should delete a node with only left child", () => {
    /**
     *    5
     *  3   7
     * 2 x  x x
     */
    const root = new BSTNode(
      5,
      new BSTNode(3, new BSTNode(2), undefined),
      new BSTNode(7)
    );

    expect(root.left?.value).toBe(3);
    expect(root.left?.left?.value).toBe(2);
    deleteNode(root, 3);
    expect(root.left?.value).toBe(2);
    expect(root.left?.left).toBe(undefined);
    expect(root).toMatchInlineSnapshot(`
      BSTNode {
        "left": BSTNode {
          "left": undefined,
          "right": undefined,
          "value": 2,
        },
        "right": BSTNode {
          "left": undefined,
          "right": undefined,
          "value": 7,
        },
        "value": 5,
      }
    `);
  });

  it("should delete leaf node", () => {
    /**
     *   5
     * 3   7
     */
    const root = new BSTNode(5, new BSTNode(3), new BSTNode(7));

    expect(root.right?.value).toBe(7);
    deleteNode(root, 7);
    expect(root.right).toBeUndefined();
  });

  it("should delete node with multiple children", () => {
    /**
     *    5
     *  3     7
     * 2 4    6 8
     *
     * it should result in:
     *
     *     5
     *  4      7
     * 2  x   6  8
     */
    const root = new BSTNode(
      5,
      new BSTNode(3, new BSTNode(2), new BSTNode(4)),
      new BSTNode(7, new BSTNode(6), new BSTNode(8))
    );

    expect(root.left?.value).toBe(3);
    deleteNode(root, 3);
    expect(root.left?.value).toBe(4);
    expect(root.left?.left?.value).toBe(2);
    expect(root.left?.right).toBeUndefined();
    expect(root).toMatchInlineSnapshot(`
      BSTNode {
        "left": BSTNode {
          "left": BSTNode {
            "left": undefined,
            "right": undefined,
            "value": 2,
          },
          "right": undefined,
          "value": 4,
        },
        "right": BSTNode {
          "left": BSTNode {
            "left": undefined,
            "right": undefined,
            "value": 6,
          },
          "right": BSTNode {
            "left": undefined,
            "right": undefined,
            "value": 8,
          },
          "value": 7,
        },
        "value": 5,
      }
    `);
  });
});
