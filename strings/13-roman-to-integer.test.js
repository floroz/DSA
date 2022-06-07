// Time complexity : O(1)O(1).

// As there is a finite set of roman numerals, the maximum number possible number can be 3999, which in roman numerals is MMMCMXCIX. As such the time complexity is O(1)O(1).

// Space Complexity O(1) - (maximum stack calls will be limited to limit of Roman Integers) + O(1) for the mapping

/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s, num = 0) {
  let dict = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  if (s.length > 1) {
    const currSym = s.charAt(0);
    const nextSym = s.charAt(1);
    const currValue = dict[currSym];
    const nextValue = dict[nextSym];

    if (currValue < nextValue) {
      // subtraction
      num += nextValue - currValue;
      return romanToInt(s.substring(2), num);
    } else {
      // addition
      num += currValue;
      return romanToInt(s.substring(1), num);
    }
  } else if (s.length > 0) {
    const sym = s.charAt(0);
    num += dict[sym];
    return romanToInt(s.substring(1), num);
  }

  return num;
};

test("romanToInt", () => {
  expect(romanToInt("LVIII")).toBe(59);
});
