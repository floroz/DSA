// https://leetcode.com/problems/fruit-into-baskets/

/**
 * Sliding Window - Two Pointers
 *
 * Time: O(N) derived from  O(N [the first while loop]+ N [the inner while to reduce the window])
 * Space: O(1) - K number of baskets is fixed and therefore constant, but if passed as variable to the function would change the Space Complexity to O(K)
 */

/**
 * @param {number[]} fruits
 * @return {number}
 */
var totalFruit = function (fruits) {
  // total amount of baskets, avoid hard-coding so that algorithm can be more extensible
  // i.e. requirement can change and we are given N extra baskets
  const BASKETS_SIZE = 2;

  // nullish and empty edge cases
  if (!fruits || !fruits.length) return 0;
  // if we have less fruits than basket, we just return all we have
  if (fruits.length < BASKETS_SIZE) return fruits.length;

  let maxFruits = 0;
  let currentWindow = 0;

  let fruitFrequency = new Map();

  let left = 0;
  let right = 0;

  while (right < fruits.length) {
    // add fruit to the basket
    fruitFrequency.set(
      fruits[right],
      fruitFrequency.get(fruits[right])
        ? fruitFrequency.get(fruits[right]) + 1
        : 1
    );
    // increase window size
    currentWindow++;

    // if window size overflows K
    // shrink window from the left side
    while (fruitFrequency.size > BASKETS_SIZE) {
      let currentFruit = fruits[left];
      let fruitAmount = fruitFrequency.get(currentFruit) - 1;

      // if we've reached 0 for that fruit, let's remove the fruit from the basket
      if (fruitAmount == 0) fruitFrequency.delete(currentFruit);
      else fruitFrequency.set(currentFruit, fruitAmount);

      // shrink current window and move slow pointer
      currentWindow--;
      left++;
    }

    // update total and keep adding fruits
    maxFruits = Math.max(currentWindow, maxFruits);
    right++;
  }

  return maxFruits;
};

test("totalFruit", () => {
  expect(totalFruit([1, 2, 1])).toBe(3);
});
