// 2024.12.10

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);
const nums = input[1].split(' ').map(Number);
const dp = new Array(N + 1).fill(0);

dp[0] = nums[0];
let maxNum = nums[0];
let lowerExist;
let answer = maxNum;

for (let i = 1; i < nums.length; i++) {
  lowerExist = false;
  maxNum = 0;
  for (let j = 0; j < i; j++) {
    if (nums[j] < nums[i]) {
      lowerExist = true;
      maxNum = Math.max(dp[j], maxNum);
    }
  }

  if (lowerExist) dp[i] = maxNum + nums[i];
  else dp[i] = nums[i];

  answer = Math.max(answer, dp[i]);
}
console.log(answer);
