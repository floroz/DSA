// Time: O(N log N)

/**
 * @param {number[][]} intervals
 * @return {number}
 */

var eraseOverlapIntervals = function (intervals) {
  let count = 0;

  if (!intervals || !intervals.length || intervals.length < 2) return count;

  // we sort our intervals by START (and if equal, the one with earliest END comes first)
  intervals.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));

  let prevEnd = intervals[0][1];

  for (let next = 1; next < intervals.length; next++) {
    if (intervals[next][0] < prevEnd) {
      count++;
      prevEnd = Math.min(intervals[next][1], prevEnd);
    } else {
      prevEnd = intervals[next][1];
    }
  }
  return count;
};

test("should ", () => {
  expect(
    eraseOverlapIntervals([
      [1, 2],
      [2, 3],
      [3, 4],
      [1, 3],
    ])
  ).toBe(1);

  expect(
    eraseOverlapIntervals([
      [1, 2],
      [1, 2],
      [1, 2],
    ])
  ).toBe(2);

  expect(
    eraseOverlapIntervals([
      [1, 2],
      [3, 4],
      [4, 5],
    ])
  ).toBe(0);

  expect(
    eraseOverlapIntervals([
      [-52, 31],
      [-73, -26],
      [82, 97],
      [-65, -11],
      [-62, -49],
      [95, 99],
      [58, 95],
      [-31, 49],
      [66, 98],
      [-63, 2],
      [30, 47],
      [-40, -26],
    ])
  ).toBe(7);
});
