// https://leetcode.com/problems/fibonacci-number/
// The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. That is,

/**
 * Memoized Fibonacci - Dynamic Programming
 */
var fib = function (n) {
  const map = new Map();

  const f = (n) => {
    if (n === 0) return 0;
    if (n <= 2) return 1;

    if (map.has(n)) {
      return map.get(n);
    }

    const res = f(n - 2) + f(n - 1);
    map.set(n, res);

    return res;
  };
  return f(n);
};
