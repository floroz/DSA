import { convertArrayToTree } from "./utils/utils";

// https://leetcode.com/problems/same-tree/

// Given the roots of two binary trees p and q, write a function to check if they are the same or not.

// Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

// if binary tree is flat array
var isSameTree_binary = function (p, q) {
  const len = p.length;

  for (let i = 0; i < len; i++) {
    if (p[i] !== q[i]) {
      return false;
    }
  }

  return true;
};

test("should work- binary array", () => {
  expect(isSameTree_binary([1, 2, 3], [1, 2, 3])).toBe(true);
  expect(isSameTree_binary([1, null, 3], [1, 2, 3])).toBe(false);
  expect(isSameTree_binary([1, 2], [1, null, 2])).toBe(false);
});

var isSameTree_BFS = function (p, q) {
  const p_queue = [p];
  const q_queue = [q];

  while (p_queue.length > 0 || q_queue.length > 0) {
    const last_p = p_queue.shift();
    const last_q = q_queue.shift();

    // we check if both nodes are null,
    // in which case we continue to see if there's more in the queue to process
    if (!last_p && !last_q) continue;

    // if one of the node is null but the other isn't - tree are not the same
    if ((!last_p && last_q) || (!last_q && last_p)) return false;

    // if the value of the two node is not the same - tree are not the same
    if (last_p.val !== last_q.val) return false;

    // if tree are identical, we reach a point where we'd only have empty children, so we exit the loop
    if (!last_p.left && !last_p.right && !last_q.lef && !last_q.right) break;

    // add all children to the queue
    p_queue.push(last_p.left);
    p_queue.push(last_p.right);
    q_queue.push(last_q.left);
    q_queue.push(last_q.right);
  }

  return true;
};

test("should work - BFS", () => {
  const input1 = [convertArrayToTree([1, 2, 3]), convertArrayToTree([1, 2, 3])];
  expect(isSameTree_BFS(...input1)).toBe(true);
  const input2 = [
    convertArrayToTree([1, null, 3]),
    convertArrayToTree([1, 2, 3]),
  ];
  expect(isSameTree_BFS(...input2)).toBe(false);
  const input3 = [convertArrayToTree([1, 2]), convertArrayToTree([1, null, 2])];

  expect(isSameTree_BFS(...input3)).toBe(false);

  const input4 = [convertArrayToTree([]), convertArrayToTree([])];

  expect(isSameTree_BFS(...input4)).toBe(true);

  const input5 = [
    convertArrayToTree([1, 2, 3, null, null, 4, 5]),
    convertArrayToTree([1, 2, 3]),
  ];

  expect(isSameTree_BFS(...input5)).toBe(true);
});

var isSameTree_DFS = function (p, q) {
  const dfs = (a, b) => {
    if (!a && !b) return true;

    if ((!a && b) || (!b && a)) return false;

    if (a.val !== b.val) return false;

    return dfs(a.left, b.left) && dfs(a.right, b.right);
  };

  return dfs(p, q);
};

test("should work - DFS", () => {
  const input1 = [convertArrayToTree([1, 2, 3]), convertArrayToTree([1, 2, 3])];
  expect(isSameTree_DFS(...input1)).toBe(true);
  const input2 = [
    convertArrayToTree([1, null, 3]),
    convertArrayToTree([1, 2, 3]),
  ];
  expect(isSameTree_DFS(...input2)).toBe(false);
  const input3 = [convertArrayToTree([1, 2]), convertArrayToTree([1, null, 2])];

  expect(isSameTree_DFS(...input3)).toBe(false);

  const input4 = [convertArrayToTree([]), convertArrayToTree([])];

  expect(isSameTree_DFS(...input4)).toBe(true);

  const input5 = [
    convertArrayToTree([1, 2, 3, null, null, 4, 5]),
    convertArrayToTree([1, 2, 3]),
  ];

  expect(isSameTree_DFS(...input5)).toBe(false);
});
