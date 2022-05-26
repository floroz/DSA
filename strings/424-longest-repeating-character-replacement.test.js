//https://leetcode.com/problems/longest-repeating-character-replacement/

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function (s, k) {
  let res = 0;
  let count = 0;
  let errors = k;

  for (let i = 0; i < s.length; i++) {
    let j = i;

    let char = s.charAt(i);

    while (j < s.length) {
      if (s.charAt(j) === char) {
        // we've got a match
        count++;
        j++;
      } else {
        // we don't have a match
        // let's check if we can swap using errors k
        if (errors) {
          count++;
          errors--;
          j++;
        } else {
          // otherwise we exit
          break;
        }
      }
    }
    res = Math.max(count, res);
    errors = k;
    count = 0;
  }

  return res;
};

test("characterReplacement", () => {
  expect(characterReplacement("ABAB", 2)).toBe(4);
  expect(characterReplacement("AABABBA", 1)).toBe(4);
  expect(characterReplacement("ABBB", 2)).toBe(4);
});
