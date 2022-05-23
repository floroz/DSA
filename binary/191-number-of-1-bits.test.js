// https://leetcode.com/problems/number-of-1-bits/

// Write a function that takes an unsigned integer and returns the number of '1' bits it has(also known as the Hamming weight).
// Example 1:

// Input: n = 00000000000000000000000000001011
// Output: 3
// Explanation: The input binary string 00000000000000000000000000001011 has a total of three '1' bits.

/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function (n) {
  const arr = n.toString(2).split("");
  return arr.reduce((acc, curr) => {
    if (curr === "1") acc++;

    return acc;
  }, 0);
};
