// Time: O(N*B) N = size of intervals, B size of booked rooms

/**
 * @param {number[][]} intervals
 * @return {number}
 */
function minMeetingRooms(intervals) {
  if (!intervals || !intervals.length) return 0;

  // sort by start time O(N log N)
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

/**
 * Solution using MinHeap
 */

const minMeetingRooms_heap = (intervals) => {
  const minHeap = new MinHeap();

  intervals.sort((a, b) => a[0] - b[0]);

  let maxRooms = 0;

  intervals.forEach((interval) => {
    const [start, end] = interval;

    if (minHeap.size > 0 && minHeap.peek() <= start) {
      minHeap.extract();
    }

    minHeap.insert(end);

    maxRooms = Math.max(maxRooms, minHeap.size);
  });

  return maxRooms;
};

// since JS does not have a native heap,
// for an interview you can quickly code-up something like this
// letting interviewer know what you are doing
class MinHeap {
  constructor(compareFunc) {
    this.compareFunc = compareFunc;
    this.heap = [];
  }

  insert(val) {
    this.heap.unshift(val);
    this.heap.sort((a, b) => a - b);
  }

  extract() {
    if (this.size === 0) return null;
    return this.heap.shift();
  }

  peek() {
    if (this.size === 0) return null;
    return this.heap[0];
  }

  get size() {
    return this.heap.length;
  }
}

test("MinHeap _ minMeetingRooms", () => {
  expect(
    minMeetingRooms_heap([
      [9, 10],
      [4, 9],
      [4, 17],
    ])
  ).toBe(2);

  expect(
    minMeetingRooms_heap([
      [0, 30],
      [5, 10],
      [15, 20],
    ])
  ).toBe(2);
});
