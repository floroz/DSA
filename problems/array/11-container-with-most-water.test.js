// https://leetcode.com/problems/container-with-most-water/

function calcArea(y1, y2, distance) {
  // Formula is
  // Area: length of shorter vertical line * distance between lines
  return Math.min(y1, y2) * distance;
}

// Time: O(N)
// Space: O(1)

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  const len = height.length;
  let maxArea = -Infinity;

  let left = 0;
  let right = len - 1;

  while (left < right) {
    const y1 = height[left];
    const y2 = height[right];
    const distance = right - left;

    const area = calcArea(y1, y2, distance);
    maxArea = Math.max(maxArea, area);

    // we want to move our pointer away from the smaller value of the two
    if (y1 > y2) {
      // if left is greater, move right
      right--;
    } else {
      // if right is greater, move left
      left++;
    }
  }

  return maxArea;
};

test("maxArea", () => {
  expect(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])).toBe(49);
  expect(maxArea([1, 1])).toBe(1);
});

// Time: O(N^2)
// Space: O(1)

/**
 * @param {number[]} height
 * @return {number}
 */
var brute_maxArea = function (height) {
  const len = height.length;
  let maxArea = -Infinity;

  for (let i = 0; i < len; i++) {
    const y1 = height[i];

    for (let j = i + 1; j < len; j++) {
      const y2 = height[j];
      const distance = j - i;

      maxArea = Math.max(maxArea, calcArea(y1, y2, distance));
    }
  }

  return maxArea;
};

test("Brute Force", () => {
  expect(brute_maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])).toBe(49);
});
