// https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/

/**
 * Two Pointers / Sliding Window
 * Time: O(N)
 * Space: O(K)
 */

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var lengthOfLongestSubstringKDistinct = function (s, k) {
  if (!k || !s) return 0;

  // we want to use a Map data structure as we need to be able to
  // access it's size in O(1) `map.size`
  let map = new Map();

  // the maximum substring we can build
  let max = -Infinity;
  // the size of our window
  let curr = 0;

  // slow pointer
  let left = 0;
  // fast pointer
  let right = 0;

  while (right < s.length) {
    // inspect character
    let char = s.charAt(right);
    // update map
    map.set(char, map.get(char) ? map.get(char) + 1 : 1);
    // increase window
    curr++;

    // if we are beyond K elements in the map, we need to shrink our window
    while (map.size > k) {
      // we remove the left element from our map
      map.set(s.charAt(left), map.get(s.charAt(left)) - 1);
      // if there are no more left elements stored, we delete the key
      // which is essential to keep track of the size correctly,
      // Example: if our map has B: 0, A:1, C:2 we need to make sure B is deleted
      // or the size will still be 3,
      // even though our window only contains 2  unique characters
      if (!map.get(s.charAt(left))) map.delete(s.charAt(left));

      // shrink window size
      curr--;
      // move slow pointer forward
      left++;
    }

    // we update the result with the current maximum substring
    max = Math.max(curr, max);
    // and move our fast pointer
    right++;
  }

  return max;
};

test("lengthOfLongestSubstringKDistinct ", () => {
  expect(lengthOfLongestSubstringKDistinct("bacc", 2)).toBe(3);
});
