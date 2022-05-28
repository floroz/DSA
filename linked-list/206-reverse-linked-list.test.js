// https://leetcode.com/problems/reverse-linked-list/

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

// Time: O(N) - one call for each node
// Space: O(N) - one call on the stack for each node, and one new node for each one (2N) reduced to N

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
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

var reverseList_iterative = function (head) {
  if (!head || !head.next) return head;

  let prev = null;
  let curr = head;

  while (curr) {
    let tmp = curr.next;
    // we shift our link to now point not at the next, but the previous value
    curr.next = prev;
    // we move our two pointers
    prev = curr;
    curr = tmp;
  }

  return prev;
};
