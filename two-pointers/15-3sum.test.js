/**
 * The Strategy here is:
 *
 * Break down this problem so that you have ONE fixed value (the i in the loop) and a subproblem which is exactly the Two Sum problem.
 *
 *
 * 1. Sort the array
 * 2. Start a loop where each value would be the fixed position for the triplet
 * 3. Create a sliding window and move based on the result of the sum
 * 4. Repeat process for every nums[i]
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function threeSum(nums) {
  const results = [];

  if (nums.length < 3) return results;

  // having the numbers in ascending order will make this problem much easier.
  // also, knowing the overall problem  will take at least O(N^2) time, we can
  // afford the O(NlogN) sort operation
  nums.sort((a, b) => a - b);

  // if the question asks us for a custom target, we can control it here
  let target = 0;

  for (let i = 0; i < nums.length - 2; i++) {
    // `i` represents the fixed number in our sorted set, from which we cn create a sliding window
    // subproblem, (i.e. two sums)
    const anchor = nums[i];
    // once this number hits 0, there's no need to go further since
    // positive numbers cannot sum to a negative number
    if (anchor > target) break;

    // we don't want repeats, so skip numbers we've already seen
    // and because the array is sorted, the next is either greater, or the same one
    if (i > 0 && anchor === nums[i - 1]) continue;

    // `left` represents the "middle" element between `i` (anchor) and `right`.
    // we will increment this up through the array while `i` and `right`
    // are anchored to their positions. we will decrement `right` for
    // for each pass through the array, and finally increment `i`
    // once `left` and `right` meet.
    let left = i + 1;

    // the "right" most element
    let right = nums.length - 1;

    while (left < right) {
      let sum = nums[i] + nums[left] + nums[right];

      // if we find the target sum, increment `left` and decrement `right` for
      // other potential combos where `i` is the anchor
      if (sum === target) {
        // store the valid threesum
        results.push([anchor, nums[left], nums[right]]);

        // this is important! we need to continue to increment `left` and decrement `right`
        // as long as those values are duplicated. in other words, we wanna skip values
        // we've already seen. otherwise, an input array of [-2,0,0,2,2] would result in
        // [[-2,0,2], [-2,0,2]].
        while (nums[left] === nums[left + 1]) left++;
        while (nums[right] === nums[right - 1]) right--;

        // finally, we need to actually move `left` forward and `right` backward to the
        // next unique elements. the previous while loops will not handle this.
        left++;
        right--;

        // if the sum is too small, increment `right` to get closer to the target
      } else if (sum < target) {
        left++;

        // if the sum is too large, decrement `left` to get closer to the target
      } else {
        // (sum > target)
        right--;
      }
    }
  }

  return results;
}

test.each([
  [
    [-1, 0, 1, 2, -1, -4],
    [
      [-1, -1, 2],
      [-1, 0, 1],
    ],
  ],
  [[], []],
  [[0], []],
])("three-sum %s", (nums, resArr) => {
  expect(threeSum(nums)).toEqual(expect.arrayContaining(resArr));
});

// NOT WORKING
var brute_threeSum = function (nums) {
  const target = 0;
  const res = [];
  if (nums == null || !nums.length || nums.length < 3) return [];

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        if (i == k || i == j || j == k) continue;

        if (nums[i] + nums[j] + nums[j] === target)
          res.push([nums[i], nums[j], nums[j]]);
      }
    }
  }

  return res;
};
