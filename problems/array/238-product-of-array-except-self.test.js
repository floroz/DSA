// Brute Force Solution O(N) ^ 2
var productExceptSelfBruteForce = function (nums) {
  return nums.map((_, i) => {
    return Math.abs(
      [...nums.slice(0, i), ...nums.slice(i + 1)].reduce(
        (acc, curr) => (acc *= curr),
        1
      )
    );
  });
};

/**
 *
 * The strategy here is to calculate the product of all the numbers first left to right, and then right to left
 *
 * To keep the memory/space complexity to O(1) we mutate the original array replacing the value with the product of the left*right for each index we are iterating over
 *
 * The Time Complexity is O(3*N) --> O(N)
 */
var productExceptSelf = function (nums) {
  let len = nums.length;

  let result = [];
  let multiplier = 1;

  for (let i = 0; i < len; i++) {
    result[i] = multiplier; // right array
    multiplier *= nums[i];
  }
  multiplier = 1; //resetting

  for (let i = len - 1; i >= 0; i--) {
    result[i] *= multiplier; // right array * left array
    multiplier *= nums[i];
  }
  return result;
};

test("brute force", () => {
  expect(productExceptSelfBruteForce([1, 2, 3, 4])).toEqual([24, 12, 8, 6]);
  expect(productExceptSelfBruteForce([-1, 1, 0, -3, 3])).toEqual([
    0, 0, 9, 0, 0,
  ]);
});

test("productExceptSelf", () => {
  expect(productExceptSelf([1, 2, 3, 4])).toEqual([24, 12, 8, 6]);
  expect(productExceptSelf([-1, 1, 0, -3, 3])).toEqual([0, 0, 9, 0, 0]);
});
