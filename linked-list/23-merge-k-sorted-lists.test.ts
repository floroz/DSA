// https://leetcode.com/problems/merge-k-sorted-lists/
import { describe, expect, it } from "vitest";


class ListNode<T> {
  constructor(public val?: T, public next: ListNode<T> | null = null) {}

}

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
function mergeLists(a, b) {
  const node = new ListNode(0);
  let temp = node;

  while (a !== null && b !== null) {
    if (a.val < b.val) {
      temp.next = a;
      a = a.next;
    } else {
      temp.next = b;
      b = b.next;
    }
    temp = temp.next as ListNode<number>;
  }
  if (a !== null) {
    temp.next = a;
  }
  if (b !== null) {
    temp.next = b;
  }
  return node.next;
}

var mergeKLists = function (lists) {
  if (lists.length === 0) {
    return null;
  }
  // two two
  // priority queue
  while (lists.length > 1) {
    let a = lists.shift(); // the head will contains the "less" length list
    let b = lists.shift(); // acturally, we can use the linkedlist to replace it, the while loop will be the while( list.header.next !== null || lists.length > 0)
    const h = mergeLists(a, b);
    lists.push(h);
  }
  return lists[0];
};

describe("mergeKLists", () => {
  it("should merge k lists", () => {
    const a = new ListNode(1, new ListNode(4, new ListNode(5)));
    const b = new ListNode(1, new ListNode(3, new ListNode(4)));
    const c = new ListNode(2, new ListNode(6));
    const result = mergeKLists([a, b, c]);
    expect(result.val).toEqual(1);
    expect(result.next.val).toEqual(1);
    expect(result.next.next.val).toEqual(2);
    expect(result.next.next.next.val).toEqual(3);
    expect(result.next.next.next.next.val).toEqual(4);
    expect(result.next.next.next.next.next.val).toEqual(4);
    expect(result.next.next.next.next.next.next.val).toEqual(5);
    expect(result.next.next.next.next.next.next.next.val).toEqual(6);
  });
});
