// https://leetcode.com/problems/climbing-stairs/
// You are climbing a staircase.It takes n steps to reach the top.

// Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

/**
 * Recursion with Memoization
 * O(N) with cache as we only have to compute the response once
 */
var climbStairs = function (n) {
  let cache = new Map();

  const climb = (n) => {
    if (n < 0) return 0;
    if (n === 1) return 1;
    if (n === 2) return 2;

    if (cache.has(n)) return cache.get(n);

    let twoSteps;

    if (cache.has(n - 2)) {
      twoSteps = cache.get(n - 2);
    } else {
      twoSteps = climb(n - 2);
      cache.set(n - 2, twoSteps);
    }

    let oneStep;

    if (cache.has(n - 1)) {
      oneStep = cache.get(n - 1);
    } else {
      oneStep = climb(n - 1);
      cache.set(n - 1, oneStep);
    }

    return twoSteps + oneStep;
  };

  return climb(n);
};

/**
 * Dynamic Programming
 * O(N) with cache as we only have to compute the response once
 */
var climbStairs_dp = function (n) {
  if (n === 0) return 0;
  if (n <= 2) return n;

  let a = 1,
    b = 2,
    res = a + b;

  for (let i = 2; i < n - 1; i++) {
    a = b;
    b = res;
    res = a + b;
  }

  return res;
};

test("climbStairs", () => {
  expect(climbStairs(5)).toBe(8);
  expect(climbStairs(2)).toBe(2);
  expect(climbStairs(1)).toBe(1);
  expect(climbStairs(0)).toBe(0);
});

test("dp - climbStairs_dp", () => {
  expect(climbStairs_dp(5)).toBe(8);
  expect(climbStairs_dp(2)).toBe(2);
  expect(climbStairs_dp(1)).toBe(1);
  expect(climbStairs_dp(0)).toBe(0);
});
