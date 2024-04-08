// https://leetcode.com/problems/merge-two-sorted-lists/
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  const dummy = new ListNode(0);
  let temp = dummy;

  // as long as there are nodes in each lists
  while (list1 !== null && list2 !== null) {
    // we compare the two nodes
    // and we link the node to our
    // new merged list (temp)
    if (list1.val < list2.val) {
      // assign current node to our merged list
      temp.next = list1;
      // we move pointer forward
      list1 = list1.next;
    } else {
      // assign current node to our merged list
      temp.next = list2;
      // we move pointer forward
      list2 = list2.next;
    }
    // change reference to node for next loop
    temp = temp.next;
  }

  // if there are more nodes in the first list
  // let's just connect it to our merged list
  if (list1 !== null) {
    temp.next = list1;
  }

  // if there are more nodes in the first list
  // let's just connect it to our merged list
  if (list2 !== null) {
    temp.next = list2;
  }

  return dummy.next;
};
