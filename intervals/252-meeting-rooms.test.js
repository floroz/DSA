// https://leetcode.com/problems/meeting-rooms/

/**
 * The strategy here is to SORT the meeting by START TIME,
 * and then COMPARE LAST END with NEXT START
 *
 * IF LAST END > NEXT START - then meeting cannot be attended
 *
 * Time: O (N log N)
 * Space: O(1)
 */

/**
 * @param {number[][]} intervals
 * @return {boolean}
 */
var canAttendMeetings = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]);

  let lastEnd;

  for (let [start, end] of intervals) {
    // this is the first meeting we're looking at
    if (!lastEnd) {
      lastEnd = end;
      continue;
    }

    if (start < lastEnd) return false;
    lastEnd = end;
  }

  return true;
};
