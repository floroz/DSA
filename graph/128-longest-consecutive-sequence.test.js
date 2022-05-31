import { Heap } from "../heap";
// https://leetcode.com/problems/longest-consecutive-sequence/

/*
The strategy here is to create a Set to quickly access values of the array in O(N).

We look at each number, and we check if the number is the start of a sequence.
A number is a start of a sequence if it doesn't have a left neighbor (therefore it means if in the Set we don't have num-1) --> `!set.has(num-1)`

If the number is the start, then we iterate to all of its right neighbors (num+n) until the neighbors exist in the set. If they do, we increase the sequence count;
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
function longestConsecutive(nums) {
  if (!nums || !nums.length) return 0;

  const numSet = new Set(nums); // O(N)

  let longestSequence = 1;

  for (let num of nums) {
    // find start of a sequence
    if (!numSet.has(nums - 1)) {
      let sequence = 1;
      let rightNeighbor = num + 1;

      while (numSet.has(rightNeighbor)) {
        rightNeighbor++;
        sequence++;
      }

      longestSequence = Math.max(longestSequence, sequence);
    }
  }

  return longestSequence;
}

// Using Heap Sort
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive1 = function (nums) {
  if (!nums || !nums.length) return 0;

  const minHeap = new Heap(Heap.minComparator);

  // O(N)
  while (nums.length) {
    // O log N
    minHeap.add(nums.shift());
  }

  let seq = 1;
  let currentSeq = 1;
  let prev = minHeap.poll();

  // O(N)
  while (minHeap.size > 0) {
    const curr = minHeap.poll();

    if (prev + 1 === curr) {
      // they are in sequence
      currentSeq++;
    } else if (curr > prev + 1) {
      // they are not in sequence
      seq = Math.max(seq, currentSeq);
      currentSeq = 1;
    }

    prev = curr;
  }

  return Math.max(seq, currentSeq);
};

test("longestConsecutive", () => {
  expect(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])).toBe(9);
  expect(longestConsecutive([1, 2, 0, 1])).toBe(3);
});
