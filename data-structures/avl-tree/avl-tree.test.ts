import { describe, expect, it } from "vitest";

class AVLTree {
  root: AVLNode | null = null;

  add(value) {
    if (!this.root) {
      this.root = new AVLNode(value);
    } else {
      this.root.add(value);
    }
  }
}

class AVLNode {
  height: number;
  constructor(
    public value: number,
    public left?: AVLNode,
    public right?: AVLNode
  ) {
    this.height = 1;
  }
  add(value) {
    if (value < this.value) {
      // go left
      if (this.left) {
        this.left.add(value);
      } else {
        this.left = new AVLNode(value);
      }
      if (!this.right || this.right.height < this.left.height) {
        this.height = this.left.height + 1;
      }
    } else {
      // go right
      if (this.right) {
        this.right.add(value);
      } else {
        this.right = new AVLNode(value);
      }
      if (!this.left || this.right.height > this.left.height) {
        this.height = this.right.height + 1;
      }
    }
    this.balance();
  }
  balance() {
    const rightHeight = this.right ? this.right.height : 0;
    const leftHeight = this.left ? this.left.height : 0;

    if (leftHeight > rightHeight + 1) {
      const leftRightHeight = this.left?.right?.height ?? 0;
      const leftLeftHeight = this.left?.left?.height ?? 0;

      if (leftRightHeight > leftLeftHeight) {
        this.left?.rotateRR();
      }

      this.rotateLL();
    } else if (rightHeight > leftHeight + 1) {
      const rightRightHeight = this.right?.right?.height ?? 0;
      const rightLeftHeight = this.right?.left?.height ?? 0;

      if (rightLeftHeight > rightRightHeight) {
        this.right?.rotateLL();
      }

      this.rotateRR();
    }
  }
  rotateRR() {
    if (!this.right) return;

    const valueBefore = this.value;
    const leftBefore = this.left;
    this.value = this.right.value;
    this.left = this.right;
    this.right = this.right.right;
    this.left.right = this.left.left;
    this.left.left = leftBefore;
    this.left.value = valueBefore;
    this.left.updateInNewLocation();
    this.updateInNewLocation();
  }
  rotateLL() {
    if (!this.left) return;

    const valueBefore = this.value;
    const rightBefore = this.right;
    this.value = this.left.value;
    this.right = this.left;
    this.left = this.left.left;
    this.right.left = this.right.right;
    this.right.right = rightBefore;
    this.right.value = valueBefore;
    this.right.updateInNewLocation();
    this.updateInNewLocation();
  }
  updateInNewLocation() {
    if (!this.right && !this.left) {
      this.height = 1;
    } else if (
      !this.right ||
      (this.left && this.right.height < this.left.height)
    ) {
      this.height = this.left?.height ?? 0 + 1;
    } else {
      //if (!this.left || this.right.height > this.left.height)
      this.height = this.right.height + 1;
    }
  }
}
describe("AVL Tree: insert", () => {
  it("should perform single left rotation", () => {
    const tree = new AVLTree();
    tree.add(30);
    tree.add(20);
    tree.add(40);
    tree.add(50);

    // insertion without balance
    expect(tree.root?.value).toBe(30);
    expect(tree.root?.left?.value).toBe(20);

    expect(tree.root?.right?.value).toBe(40);
    expect(tree.root?.right?.right?.value).toBe(50);

    tree.add(60);

    expect(tree.root?.value).toBe(30);
    expect(tree.root?.left?.value).toBe(20);
    // left rotation balance affecting the right side
    expect(tree.root?.right?.value).toBe(50);
    expect(tree.root?.right?.right?.value).toBe(60);
    expect(tree.root?.right?.left?.value).toBe(40);
  });
});
