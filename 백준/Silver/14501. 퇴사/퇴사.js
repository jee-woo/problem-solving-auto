// 2024.12.11

const fs = require('fs');

const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);
const nums = input.slice(1).map((v) => v.split(' ').map(Number));
nums.unshift([0, 0]);

const dp = new Array(N + 1).fill(0);

for (let i = 1; i <= N; i++) {
  let max = 0;
  for (let j = 0; j <= i; j++) {
    if (nums[j][0] === i - j + 1) {
      if (dp[j - 1] + nums[j][1] > max && dp[j - 1] + nums[j][1] > dp[i - 1]) {
        max = dp[j - 1] + nums[j][1];
      }
    }
  }
  if (max) {
    dp[i] = max;
  } else {
    dp[i] = dp[i - 1];
  }
}

console.log(dp[N]);
