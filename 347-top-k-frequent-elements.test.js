// https://leetcode.com/problems/top-k-frequent-elements/

// Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

// Example 1:

// Input: nums = [1,1,1,2,2,3], k = 2
// Output: [1,2]
// Example 2:

// Input: nums = [1], k = 1
// Output: [1]

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
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

test("topKFrequent", () => {
  expect(topKFrequent([1, 1, 1, 2, 2, 3], 2)).toStrictEqual([1, 2]);
  expect(topKFrequent([1], 2)).toStrictEqual([1]);
  expect(topKFrequent([4, 1, -1, 2, -1, 2, 3], 2)).toStrictEqual([-1, 2]);
});
