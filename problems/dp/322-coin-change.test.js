// https://leetcode.com/problems/coin-change/

// You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

// Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

// You may assume that you have an infinite number of each kind of coin.

// Example 1:

// Input: coins = [1,2,5], amount = 11
// Output: 3
// Explanation: 11 = 5 + 5 + 1
// Example 2:

// Input: coins = [2], amount = 3
// Output: -1
// Example 3:

// Input: coins = [1], amount = 0
// Output: 0

var coinChange = function (coins, amount) {
  const cache = new Map();

  const backtrack = (total) => {
    // out of bounds
    if (total < 0) return -1;

    // we'red done
    if (total === 0) return 1;

    let change = Infinity;

    for (let c of coins) {
      let value;

      if (cache.has(total - c)) {
        value = cache.get(total - c);
      } else {
        value = 1 + backtrack(total - c);
        cache.set(total - c, value);
      }

      if (value !== -1) {
        change = Math.min(change, value);
      }
    }

    return change;
  };

  const change = backtrack(amount);

  if (change === +Infinity) return -1;

  return change;
};

const coinChange_dp = (coins, amount) => {
  const dp = Array(amount + 1).fill(Infinity); // This arr tells us how many coins we need for each amount.
  dp[0] = 0; // To make 0, we need 0 coins.
  for (let coin of coins) {
    // Check each coin
    for (let i = coin; i <= amount; i++) {
      // Iterate through the entire amount from coin
      dp[i] = Math.min(dp[i], dp[i - coin] + 1); // Update minimum number of needed coins.
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount]; // If the last element is Infinity, then we cannot make the amount.
};

test("Recursion: coinChange", () => {
  expect(coinChange([1, 2, 5], 11)).toBe(3);
  expect(coinChange([2, 5, 10, 1], 27)).toBe(4);
  expect(coinChange([186, 419, 83, 408], 6249)).toBe(20);
});

test("DP: coinChange", () => {
  expect(coinChange_dp([1, 2, 5], 11)).toBe(3);
  expect(coinChange_dp([2, 5, 10, 1], 27)).toBe(4);
  expect(coinChange_dp([186, 419, 83, 408], 6249)).toBe(20);
});
