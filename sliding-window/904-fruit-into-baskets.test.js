// https://leetcode.com/problems/fruit-into-baskets/

/**
 * Sliding Window - Two Pointers
 *
 * Time: O(N) derived from  O(N [the first while loop]+ N [the inner while to reduce the window])
 * Space: O(K) - K number of baskets
 */

/**
 * @param {number[]} fruits
 * @return {number}
 */
var totalFruit = function (fruits) {
  // total amount of baskets, avoid hard-coding so that algorithm can be more extensible
  // i.e. requirement can change and we are given N extra baskets
  const K = 2;

  // nullish and empty edge cases
  if (!fruits || !fruits.length) return 0;
  // if we have less fruits than basket, we just return all we have
  if (fruits.length < K) return fruits.length;

  let total = 0;
  let currentWindow = 0;

  let basket = new Map();

  let left = 0;
  let right = 0;

  while (right < fruits.length) {
    // add fruit to the basket
    basket.set(
      fruits[right],
      basket.get(fruits[right]) ? basket.get(fruits[right]) + 1 : 1
    );
    // increase window size
    currentWindow++;

    // if window size overflows K
    // shrink window from the left side
    while (basket.size > K) {
      let fruit = fruits[left];
      let reducedAmount = basket.get(fruit) - 1;

      // if we've reached 0 for that fruit, let's remove the fruit from the basket
      if (reducedAmount == 0) basket.delete(fruit);
      else basket.set(fruit, reducedAmount);

      // shrink current window and move slow pointer
      currentWindow--;
      left++;
    }

    // update total and keep adding fruits
    total = Math.max(currentWindow, total);
    right++;
  }

  return total;
};

test("totalFruit", () => {
  expect(totalFruit([1, 2, 1])).toBe(3);
});
