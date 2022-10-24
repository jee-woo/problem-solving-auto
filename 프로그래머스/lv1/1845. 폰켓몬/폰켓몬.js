function solution(nums) {
    let numSet = new Set(nums);
    let setSize = numSet.size;
    if (setSize > nums.length / 2) return nums.length / 2;
    else return setSize;
}