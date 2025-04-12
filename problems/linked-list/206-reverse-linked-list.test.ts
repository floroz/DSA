// https://leetcode.com/problems/reverse-linked-list/
import { describe, expect, it } from "vitest";

class ListNode<T> {
  constructor(
    public val?: T,
    public next: ListNode<T> | null = null
  ) {}
}

// Time: O(N) - one call for each node
// Space: O(N) - one call on the stack for each node, and one new node for each one (2N) reduced to N

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const reverseList = function (head) {
  if (!head || !head.next) return head;

  const h = new ListNode();

  const reverse = (node) => {
    if (!node.next) {
      // we've reached the tail of original list
      // we add the value of the new head
      h.val = node.val;
      // we return the new head into the next call on the stack to
      // populate the link between this node and its child
      return h;
    }

    // we create a new node for our reversed list
    const newNode = new ListNode(node.val);

    // grab the parent from the call returning from the stack
    const reversed = reverse(node.next);
    // link the reference from the parent to the new child
    reversed.next = newNode;
    // return the child
    return newNode;
  };

  reverse(head);

  return h;
};

const reverseList_iterative = function (head) {
  if (!head || !head.next) return head;

  let prev = null;
  let curr = head;

  while (curr) {
    const tmp = curr.next;
    // we shift our link to now point not at the next, but the previous value
    curr.next = prev;
    // we move our two pointers
    prev = curr;
    curr = tmp;
  }

  return prev;
};

describe("Reverse Linked List", () => {
  it("should reverse a linked list", () => {
    const head = new ListNode(
      1,
      new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
    );

    const reversed = reverseList(head);

    expect(reversed.val).toBe(5);
    expect(reversed.next.val).toBe(4);
    expect(reversed.next.next.val).toBe(3);
    expect(reversed.next.next.next.val).toBe(2);
    expect(reversed.next.next.next.next.val).toBe(1);
  });

  it("should reverse a linked list iteratively", () => {
    const head = new ListNode(
      1,
      new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
    );

    const reversed = reverseList_iterative(head);

    expect(reversed.val).toBe(5);
    expect(reversed.next.val).toBe(4);
    expect(reversed.next.next.val).toBe(3);
    expect(reversed.next.next.next.val).toBe(2);
    expect(reversed.next.next.next.next.val).toBe(1);
  });
});
