/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {string[]}
 */
var findMissingRanges = function (nums, lower, upper) {
  if (!nums || !nums.length) return [createRange(lower - 1, upper + 1)];

  const arr = [];

  nums.unshift(lower - 1);
  nums.push(upper + 1);

  for (let i = 0; i < nums.length - 1; i++) {
    const curr = nums[i];
    const next = nums[i + 1];

    if (hasGap(curr, next)) arr.push(createRange(curr, next));
  }

  return arr;
};

function hasGap(a, b) {
  if (a === b) return false;
  return b - 1 - a !== 0;
}

function createRange(a, b) {
  let start = a + 1;
  let finish = b - 1;

  if (start === finish) return String(start);

  return `${a + 1}->${b - 1}`;
}
