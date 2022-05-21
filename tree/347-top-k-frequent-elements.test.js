// https://leetcode.com/problems/top-k-frequent-elements/

// Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

// Example 1:

// Input: nums = [1,1,1,2,2,3], k = 2
// Output: [1,2]
// Example 2:

// Input: nums = [1], k = 1
// Output: [1]

var topKFrequent = function (nums, k) {
  // O(N) memory
  const map = {};

  if (nums.length < 1) return [];

  // O(N)
  for (let num of nums) {
    const key = String(num);
    map[key] = map[key] ? map[key] + 1 : 1;
  }

  // O(n log n)
  const sorted = Object.entries(map).sort((a, b) => {
    // if we have the same number of occurances for one digit
    // let's sort them in ascending order by the key, which is the number itself
    // example we have  [2,2] and  [-1,2]
    // then we want to have [-1,2] first, and then [2,2]
    if (b[1] == a[1]) return +a[0] - +b[1];

    return b[1] - a[1];
  });

  const res = [];
  const len = Math.min(k, sorted.length);

  for (let i = 0; i < len; i++) {
    res.push(+sorted[i][0]);
  }

  return res;
};

// Complexity Analysis

// Time complexity : \mathcal{O}(N \log k)O(Nlogk) if k < Nk<N and \mathcal{O}(N)O(N) in the particular case of N = kN=k. That ensures time complexity to be better than \mathcal{O}(N \log N)O(NlogN).

// Space complexity : \mathcal{O}(N + k)O(N+k) to store the hash map with not more NN elements and a heap with kk elements.
var topKFrequent_Min_Heap = function (nums, k) {
  // O(N) memory
  const map = {};

  if (nums.length < 1) return [];

  // O(N)
  for (let num of nums) {
    const key = String(num);
    map[key] = map[key] ? map[key] + 1 : 1;
  }

  const entries_queue = Object.entries(map);

  const min_heap = [entries_queue.shift()];

  while (entries_queue.length > 0) {
    // add to the heap the first element in the queue
    min_heap.push(entries_queue.shift());

    while (true) {
      // get the new index from the elemenet just added
      const childIdx = min_heap.length - 1;
      // find parent index
      const parentIdx = Math.ceil(childIdx / 2 - 1);

      // compare the child freq with the parent freq
      const child = min_heap[childIdx];
      const parent = min_heap[parentIdx];

      if (!parent) break;

      const isChildFreqLessThanParent = parent[1] > child[1];
      const isChildKeyEqualToParent = parent[1] === child[1];
      const isParentKeyGreaterThanChildKey = parent[0] > child[0];

      if (
        isChildFreqLessThanParent ||
        (isChildKeyEqualToParent && isParentKeyGreaterThanChildKey)
      ) {
        // the rule of min heap requires the parent to be smaller than the child
        // swap items
        min_heap[childIdx] = parent;
        min_heap[parentIdx] = child;
      } else {
        break;
      }
    }

    if (min_heap.length > k) {
      min_heap.shift();
    }
  }

  return min_heap.map((entry) => +entry[0]);
};

test("topKFrequent", () => {
  expect(topKFrequent([1, 1, 1, 2, 2, 3], 2)).toStrictEqual([1, 2]);
  expect(topKFrequent([1], 2)).toStrictEqual([1]);
  expect(topKFrequent([4, 1, -1, 2, -1, 2, 3], 2)).toStrictEqual([-1, 2]);
});
test("topKFrequent_Min_Heap", () => {
  // expect(topKFrequent_Min_Heap([1, 1, 1, 2, 2, 3], 2)).toStrictEqual([1, 2]);
  // expect(topKFrequent_Min_Heap([1], 2)).toStrictEqual([1]);
  expect(topKFrequent_Min_Heap([4, 1, -1, 2, -1, 2, 3], 2)).toStrictEqual([
    -1, 2,
  ]);
});
