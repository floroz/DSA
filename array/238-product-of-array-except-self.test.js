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
  // trasform original array into object hosting keys left and right to store the values
  for (let i = 0; i < nums.length; i++) {
    let val = nums[i];
    nums[i] = { val, right: 1, left: 1 };
  }

  // first element from the left does not have a previous number to look at, so we default to value 1 and start loop from next element
  nums[0].left = 1;
  for (let i = 1; i < nums.length; i++) {
    const prevNum = nums[i - 1].val;
    const prevPrefix = nums[i - 1].left;

    nums[i].left = prevNum * prevPrefix;
  }

  // first element from the right does not have a previous number to look at, so we default to value 1 and start loop from next element
  nums[nums.length - 1].right = 1;
  for (let i = nums.length - 2; i >= 0; i--) {
    const prevNum = nums[i + 1].val;
    const prevPrefix = nums[i + 1].right;

    nums[i].right = prevNum * prevPrefix;
  }

  // we reduce each object to a single value by multiplying the product of the left and the right at the index position
  return nums.map((num) => num.left * num.right);
};

test("should work - brute force", () => {
  expect(productExceptSelfBruteForce([1, 2, 3, 4])).toEqual([24, 12, 8, 6]);
  expect(productExceptSelfBruteForce([-1, 1, 0, -3, 3])).toEqual([
    0, 0, 9, 0, 0,
  ]);
});

test("should work", () => {
  expect(productExceptSelf([1, 2, 3, 4])).toEqual([24, 12, 8, 6]);
  expect(productExceptSelf([-1, 1, 0, -3, 3])).toEqual([0, 0, 9, 0, 0]);
});
