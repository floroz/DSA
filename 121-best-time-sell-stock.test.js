// Brute Force O(N^2)
// const maxProfit = (prices) => {
//      let profit = 0;

//      for (let i = 0; i < prices.length; i++) {
//        for (let j = i + 1; j < prices.length; j++) {
//          profit = Math.max(profit, prices[j] - prices[i]);
//        }
//      }

//      return profit;
// }

/**
 * Two pointes technique
 */
export const maxProfit = (prices) => {
  let buy = 0;
  let sell = 1;
  let profit = 0;

  while (sell < prices.length) {
    if (prices[buy] > prices[sell]) {
      buy = sell;
      sell = buy + 1;
    } else {
      profit = Math.max(prices[sell] - prices[buy], profit);
      sell++;
    }
  }

  return profit;
};

test("should work", () => {
  const nums = [7, 1, 5, 3, 6, 4];
  const expected = 5;
  expect(maxProfit(nums)).toEqual(expected);
});
