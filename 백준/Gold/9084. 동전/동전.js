// 2024.12.24

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let idx = 1;
while (true) {
  if (!input[idx]) break;
  const N = Number(input[idx++]);
  const nums = input[idx++].split(' ').map(Number);
  const M = Number(input[idx++]);
  solution(N, nums, M);
}

function solution(n, nums, m) {
  const dp = Array.from({ length: n }, () => Array(m + 1).fill(0));

  for (let j = 0; j <= m; j++) {
    if (j % nums[0] === 0) dp[0][j] += 1;
  }

  for (let i = 1; i < n; i++) {
    const num = nums[i];
    for (let j = 0; j <= m; j++) {
      dp[i][j] += dp[i - 1][j] + (j - num >= 0 ? dp[i][j - num] : 0);
    }
  }

  console.log(dp[n - 1][m]);
}
