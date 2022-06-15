// https://leetcode.com/problems/two-sum/

// Time Complexity
// The time complexity of the above algorithm will be O(N), where ‘N’ is the total number of elements in the given array.

// Space Complexity
// The space complexity will also be O(N), as, in the worst case, we will be pushing ‘N’ numbers in the HashTable

const twoSum = (nums, target) => {
  let len = nums.length;

  if (len < 2) return [];

  const map = new Map();

  for (let i = 0; i < len; i++) {
    const diff = target - nums[i];

    if (map.has(diff)) {
      return [map.get(diff), i];
    } else {
      map.set(nums[i], i);
    }
  }

  return [];
};

test.each([
  [[3, 2, 4], 6, [1, 2], 2],
  [[2, 7, 11, 15], 9, [0, 1], 2],
  [[3, 3], 6, [0, 1], 2],
])("two sum %s", (nums, target, resArr, len) => {
  expect(twoSum(nums, target)).toEqual(expect.arrayContaining(resArr));
  expect(twoSum(nums, target)).toHaveLength(len);
});

// const twoSum = (nums, target) => {
//   if (!nums || !nums.length) return [];

//   let copy = [...nums];

//   nums.sort((a, b) => a - b);

//   let left = 0;
//   let right = nums.length - 1;

//   while (left < right) {
//     if (nums[left] + nums[right] === target) {
//       let firstIndex = copy.indexOf(nums[left]);

//       // reset value of the copy so that we won't find duplicate indeces
//       copy[firstIndex] = NaN;

//       let secondIndex = copy.indexOf(nums[right]);

//       return [firstIndex, secondIndex];
//     } else if (nums[left] + nums[right] > target) {
//       right--;
//     } else {
//       left++;
//     }
//   }

//   return [];
// };
