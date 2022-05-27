// Time: O(N*B) N = size of intervals, B size of booked rooms

/**
 * @param {number[][]} intervals
 * @return {number}
 */
function minMeetingRooms(intervals) {
  if (!intervals || !intervals.length) return 0;

  // sort by start time
  intervals.sort((a, b) => a[0] - b[0]);

  const bookingSystem = [];

  for (let [start, end] of intervals) {
    // let's find if an interval is already covering our current range start-end
    const availableRoom = bookingSystem.find(
      // a room is available if its meeting ends before the start of our current one
      (rooms) => rooms[1] <= start
    );

    if (!availableRoom) {
      // if no interval is present, we need a new room
      bookingSystem.push([start, end]);
    } else {
      // if we have a room, let's add the time of our current meeting to extend its booking
      availableRoom[1] = end;
    }
  }

  return bookingSystem.length;
}

// Room 1: from 2 to 9
// Room 2: from 3 to 7 (holding 2 meetings now)
// Room 3: from 4 to 7

// [2, 9] <- we book a room
// [3, 5] <- we book a room
// [4, 7] <- we book a room
// [5, 6] <- we add time to room 2
// [6, 7] <- we add time to room 2

test("minMeetingRooms", () => {
  expect(
    minMeetingRooms([
      [9, 10],
      [4, 9],
      [4, 17],
    ])
  ).toBe(2);

  expect(
    minMeetingRooms([
      [0, 30],
      [5, 10],
      [15, 20],
    ])
  ).toBe(2);
});
