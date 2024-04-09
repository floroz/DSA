import { describe, expect, it } from "vitest";
import { BSTNode } from "./bst-node";

// first root, then left, then right
function preOrderTraversal<T>(
  node: BSTNode<T> | undefined | null,
  visitor: (node: BSTNode<T>) => void
) {
  if (!node) {
    return;
  }
  visitor(node);
  if (node.left) {
    preOrderTraversal(node.left, visitor);
  }
  if (node.right) {
    preOrderTraversal(node.right, visitor);
  }

  return;
}

// first left, then root, then right
function inOrderTraversal<T>(
  node: BSTNode<T>,
  visitor: (node: BSTNode<T>) => void
) {
  if (!node) {
    return;
  }
  if (node.left) {
    inOrderTraversal(node.left, visitor);
  }
  visitor(node);
  if (node.right) {
    inOrderTraversal(node.right, visitor);
  }

  return;
}

// first left, then right, then root
function postOrderTraversal<T>(
  node: BSTNode<T>,
  visitor: (node: BSTNode<T>) => void
) {
  if (!node) {
    return;
  }
  if (node.left) {
    inOrderTraversal(node.left, visitor);
  }
  if (node.right) {
    inOrderTraversal(node.right, visitor);
  }

  visitor(node);
  return;
}

describe("BinarySearchTree - Depth First Search", () => {
  describe("preOrderTraversal", () => {
    it("should traverse the tree in pre-order", () => {
      const root = new BSTNode(1);
      const left = new BSTNode(2);
      const right = new BSTNode(3);

      root.left = left;
      root.right = right;

      const result: number[] = [];
      preOrderTraversal(root, (node) => {
        result.push(node.value);
      });

      expect(result).toEqual([1, 2, 3]);
    });
  });

  describe("inOrderTraversal", () => {
    it("should traverse the tree in in-order", () => {
      const root = new BSTNode(1);
      const left = new BSTNode(2);
      const right = new BSTNode(3);

      root.left = left;
      root.right = right;

      const result: number[] = [];
      inOrderTraversal(root, (node) => {
        result.push(node.value);
      });

      expect(result).toEqual([2, 1, 3]);
    });
  });

  describe("postOrderTraversal", () => {
    it("should traverse the tree in post-order", () => {
      const root = new BSTNode(1);
      const left = new BSTNode(2);
      const right = new BSTNode(3);

      root.left = left;
      root.right = right;

      const result: number[] = [];
      postOrderTraversal(root, (node) => {
        result.push(node.value);
      });

      expect(result).toEqual([2, 3, 1]);
    });
  });
});
