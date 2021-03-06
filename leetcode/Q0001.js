// 给定一个整数数组 nums 和一个目标值 target，
// 请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
// 你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

/**
 * @description 1. 两数之和
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum1 = function(nums, target) {
  // O(n^2)
  let i = 0, j = 1;
  for (i = 0; i < nums.length - 1; i++) {
    for (j = i + 1; j <= nums.length - 1; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  };
  return [];
};

var twoSum2 = function (nums, target) {
  // O(n)
  for (let i = 0; i < nums.length - 1; i++) {
    const v = nums[i];
    const j = nums.indexOf(target - v, i + 1);
    if (j !== -1) {
      return [i, j];
    }
  }
  return [];
}

console.log(twoSum2([-3,4,3,90], 0));