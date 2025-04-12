// https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/

// There are several cards arranged in a row, and each card has an associated number of points. The points are given in the integer array cardPoints.

// In one step, you can take one card from the beginning or from the end of the row. You have to take exactly k cards.

// Your score is the sum of the points of the cards you have taken.

// Given the integer array cardPoints and the integer k, return the maximum score you can obtain.

// Example 1:

// Input: cardPoints = [1,2,3,4,5,6,1], k = 3
// Output: 12
// Explanation: After the first step, your score will always be 1. However, choosing the rightmost card first will maximize your total score. The optimal strategy is to take the three cards on the right, giving a final score of 1 + 6 + 5 = 12.
// Example 2:

// Input: cardPoints = [2,2,2], k = 2
// Output: 4
// Explanation: Regardless of which two cards you take, your score will always be 4.
// Example 3:

// Input: cardPoints = [9,7,7,9,7,7,9], k = 7
// Output: 55
// Explanation: You have to take all the cards. Your score is the sum of points of all cards.

// Since we're forced to take K amount of cards no matter what, we can solve this problem with a two-pointer system with a sliding window approach. Instead of counting the sum of the values between the two pointers, we'll instead be counting the sum of the values outside the sliding window.

// Time Complexity: O(K)
// Space Complexity: O(1)

// Sliding Window Approach
const maxScore = (cards, k) => {
  const len = cards.length;

  let left = -1;
  let right = len - k;

  let leftSum = 0;
  let rightSum = 0;

  // calculate sum for all the cards
  // on the right of the sliding window
  for (let i = right; i < len; i++) {
    rightSum += cards[i];
  }

  // this is our first result (but might not be the highest yet)
  let max = rightSum;

  // if K is the size of the array, we return the sum because
  // it will contain all the numbers
  if (k >= len) return rightSum;

  // if K is less than the size, then we move the sliding window
  // and we recompute the result by removing an element from the right,
  // and adding one from the left
  for (let i = 0; i < k; i++) {
    left++;
    right++;

    leftSum += cards[left];
    rightSum -= cards[right - 1];

    max = Math.max(max, leftSum + rightSum);
  }

  return max;
};

test("should work", () => {
  expect(maxScore([1, 2, 3, 4, 5, 6, 1], 3)).toBe(12);
  expect(maxScore([9, 7, 7, 9, 7, 7, 9], 7)).toBe(55);
  expect(maxScore([2, 2, 2], 2)).toBe(4);
});
