// 2024.12.11

const fs = require('fs');

const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input[0]);
const nums = input.slice(1).map((v) => v.split(' ').map(Number));
nums.unshift([0, 0]);
// console.table(nums);

const dp = new Array(N + 1).fill(0);

// let last = 0;

for (let i = 1; i <= N; i++) {
  // const [day, money] = nums[i];

  let max = 0;
  let maxIdx;
  for (let j = 0; j <= i; j++) {
    if (nums[j][0] === i - j + 1) {
      if (dp[j - 1] + nums[j][1] > max && dp[j - 1] + nums[j][1] > dp[i - 1]) {
        max = dp[j - 1] + nums[j][1];
        maxIdx = j;
      }
    }
  }
  if (maxIdx !== undefined) {
    // dp[i] = dp[i - 1] + max;
    // dp[i] = dp[maxIdx - 1] + nums[maxIdx][1];
    dp[i] = max;
    // last = maxIdx;
    // console.log(i, maxIdx, max);
  } else {
    dp[i] = dp[i - 1];
  }
}

// console.table(dp);

console.log(dp[N]);
