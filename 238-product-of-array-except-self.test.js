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

var productExceptSelf = function (nums) {
  const product = nums.reduce((acc, curr) => (acc *= curr), 1);

  return nums.map((num) => Math.abs(product / num));
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
