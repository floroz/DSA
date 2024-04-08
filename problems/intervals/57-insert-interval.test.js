/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
  let index = intervals.length;

  // 1. insert newInterval O(N)
  for (let i = 0; i < intervals.length; i++) {
    // we know intervals is sorted so
    // let's find the first start that is greater than our newInterval start

    if (intervals[i][0] > newInterval[0]) {
      index = i;
      break;
    }
  }

  // insert the new interval in the correct position
  intervals.splice(index, 0, newInterval);

  // 2. merge all overalapping O(N)
  let left = 0;
  let right = left + 1;

  while (right < intervals.length) {
    // compare intervals
    if (intervals[left][1] >= intervals[right][0]) {
      // intervals do overlap, we need to merge them

      // mutate left one with the greatest end
      intervals[left][1] = Math.max(intervals[left][1], intervals[right][1]);

      intervals.splice(right, 1);
    } else {
      left++;
      right++;
    }
  }

  return intervals;
};

test("should ", () => {
  expect(
    insert(
      [
        [1, 3],
        [6, 9],
      ],
      [2, 5]
    )
  ).toStrictEqual([
    [1, 5],
    [6, 9],
  ]);
});
