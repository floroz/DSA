// https://leetcode.com/problems/maximum-product-subarray/

// Given an integer array nums, find a contiguous non-empty subarray within the array that has the largest product, and return the product.

// The test cases are generated so that the answer will fit in a 32-bit integer.

// A subarray is a contiguous subsequence of the array.

// Example 1:

// Input: nums = [2,3,-2,4]
// Output: 6
// Explanation: [2,3] has the largest product 6.
// Example 2:

// Input: nums = [-2,0,-1]
// Output: 0
// Explanation: The result cannot be 2, because [-2,-1] is not a subarray.

/**
 * Time: O(N)
 * Space: O(1)
 */
const maxProduct = function (nums) {
  let res = nums.reduce((max, v) => (max = Math.max(max, v)), -Infinity);

  let currentMax = 1;
  let currentMin = 1;

  for (let num of nums) {
    if (num === 0) {
      currentMax = 1;
      currentMin = 1;
    } else {
      let tempMax = num * currentMax;
      let tempMin = num * currentMin;
      /**
       * There are three combinations:
       * max is 1 and num is 1
       * min is -1 and num is -1
       * num is positive and both min and max are positive
       */

      currentMax = Math.max(tempMax, tempMin, num);
      currentMin = Math.min(tempMax, tempMin, num);

      res = Math.max(res, currentMax);
    }
  }

  return res;
};

test("maxProduct", () => {
  expect(maxProduct([2, 3, -2, 4])).toBe(6);
  expect(maxProduct([-2, 0, -1])).toBe(0);
});
