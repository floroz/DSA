// https://leetcode.com/problems/shortest-way-to-form-string/

// We start while loop through the target and inside we create another pointer and boolean.
// Create another while loop inside the first one to iterate over the source string. keep moving the source pointer no matter what, and only move pointer of the target if we have a match and here important to check the boolean to make sure we have found at least one match. After the iteration over the source is done and boolean was switched we add count. In case if the boolean was never switched return -1 immediately.
/**
 * @param {string} source
 * @param {string} target
 * @return {number}
 */
var shortestWay = function (source, target) {
  let count = 0;
  let t = 0;

  while (t < target.length) {
    let s = 0;
    let movedAtLeastOnce = false;

    while (s < source.length) {
      if (source[s] === target[t]) {
        t++;
        movedAtLeastOnce = true;
      }
      s++;
    }

    if (!movedAtLeastOnce) return -1;
    count++;
  }
  return count;
};

test("should first", () => {
  // expect(shortestWay("abc", "abcbc")).toBe(2);
  // expect(shortestWay("abc", "acdbc")).toBe(-1);
  expect(shortestWay("xyz", "xzyxz")).toBe(3);
});
