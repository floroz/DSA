// Two decision Tree, O(2N) Time with O(N) Space

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxAlternatingSum = function (nums) {
  if (!nums || !nums.length) return 0;

  let cache = {};

  const dfs = (i, even) => {
    // create a key for the cache
    const key = `${even}-${i}`;

    // base case 1. out of bounds
    if (i === nums.length) return 0;

    // base case 2. already computed
    if (cache[key]) return cache[key];

    // we calculate the total for the current i, based on whether we are
    // on an even, or odd decision
    const total = even ? nums[i] : -1 * nums[i];

    // we decide to include the current element in our sum
    const decision1 = total + dfs(i + 1, !even);
    // we decide to skip the current element from our sum
    const decision2 = dfs(i + 1, even);

    // we find out which decision tree leads to the better result
    const result = Math.max(decision1, decision2);

    // save the cache and return result
    cache[key] = result;

    return result;
  };

  return dfs(0, true);
};

test("maxAlternatingSum", () => {
  expect(maxAlternatingSum([4, 2, 5, 3])).toBe(7);
});
