/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  if (!intervals || intervals.length < 2) return intervals;

  // we sort our intervals by START (and if equal, the one with earliest END comes first)
  intervals.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));

  // we place the first interval in the response array
  let prev = intervals[0];
  let res = [prev];

  for (let [start, end] of intervals) {
    // we start comparing all the intervals with the last interval in the result array

    // if the start happens before the last end, there is overlap
    // and we need to merge the two intervals
    if (start <= prev[1]) {
      //  let's grab the the greatest end
      prev[1] = Math.max(prev[1], end);
    } else {
      // no overlap, let's add the interval
      res.push([start, end]);
      prev = res[res.length - 1];
    }
  }

  return res;
};

test("Merge intervals", () => {
  expect(
    merge([
      [1, 3],
      [2, 6],
      [8, 10],
      [15, 18],
    ])
  ).toStrictEqual([
    [1, 6],
    [8, 10],
    [15, 18],
  ]);
});
