// https://leetcode.com/problems/house-robber/

// This particular problem and most of others can be approached using the following sequence:

// 1. Find recursive relation
// 2. Recursive (top-down)
// 3. Recursive + memo (top-down)
// 4. Iterative + memo (bottom-up)
// 5. Iterative + N variables (bottom-up)

// Step 1. Figure out recursive relation.

// A robber has 2 options: a) rob current house i; b) don't rob current house.
// If an option "a" is selected it means she can't rob previous i-1 house but can safely proceed to the one before previous i-2 and gets all cumulative loot that follows.
// If an option "b" is selected the robber gets all the possible loot from robbery of i-1 and all the following buildings.
// So it boils down to calculating what is more profitable:

// - robbery of current house + loot from houses before the previous
// - loot from the previous house robbery and any loot captured before that
// rob(i) = Math.max( rob(i - 2) + currentHouseValue, rob(i - 1) )

// Step 2. Recursive (top-down)
// Converting the recurrent relation from Step 1 shound't be very hard.
function rob_recursive_top_down(nums) {
  const steal = (nums, i) => {
    // out of bounds
    if (i < 0) return 0;

    return Math.max(steal(nums, i - 2) + nums[i], steal(nums, i - 1));
  };

  return steal(nums, nums.length - 1);
}

// Step 3. Recursive + memo (top-down).
function rob_recursive_top_down_with_memo(nums) {
  const memo = {};

  const steal = (nums, i) => {
    // out of bounds
    if (i < 0) return 0;

    if (memo[i]) return memo[i];

    memo[i] = Math.max(steal(nums, i - 2) + nums[i], steal(nums, i - 1));

    return memo[i];
  };

  return steal(nums, nums.length - 1);
}

// Step 4. Iterative + memo (bottom-up)
function rob_iterative_bottom_up_with_memo(nums) {
  const memo = {};
  if (!nums.length) return 0;

  memo[0] = 0;
  memo[1] = nums[0];

  for (let i = 1; i < nums.length; i++) {
    memo[i + 1] = Math.max(memo[i], memo[i - 1] + nums[i]);
  }

  return memo[nums.length];
}

// Step 5. Iterative + memo (bottom-up) Time: O(N) Space: O(1)
var rob = function (nums) {
  let prevMax = 0,
    curMax = 0;
  for (let n of nums) {
    let temp = curMax;
    curMax = Math.max(prevMax + n, curMax); // rob vs !rob
    prevMax = temp;
  }
  return Math.max(curMax, prevMax);
};

test("rob", () => {
  expect(rob([1, 2, 3, 1])).toBe(4);
  expect(rob([2, 7, 9, 3, 1])).toBe(12);
  expect(rob([4, 1, 2, 7, 5, 3, 1])).toBe(14);
});
