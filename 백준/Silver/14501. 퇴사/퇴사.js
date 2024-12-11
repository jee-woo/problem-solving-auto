// 2024.12.11

const fs = require('fs');

const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input[0]);
const nums = input.slice(1).map((v) => v.split(' ').map(Number));
const dp = Array.from({ length: N + 1 }, () => Array(2).fill(0));
dp[N - 1][0] = nums[N - 1][0] > 1 ? 0 : nums[N - 1][1];
dp[N - 1][1] = 0;

for (let i = N - 2; i >= 0; i--) {
  if (nums[i][0] > N - i) {
    dp[i][0] = Math.max(...dp[i + 1]);
    dp[i][1] = Math.max(...dp[i + 1]);
  } else {
    dp[i][0] = Math.max(...dp[i + nums[i][0]]) + nums[i][1];
    dp[i][1] = Math.max(...dp[i + 1]);
  }
}

console.log(Math.max(...dp[0]));
