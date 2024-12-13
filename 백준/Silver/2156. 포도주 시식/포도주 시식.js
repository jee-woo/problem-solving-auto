// 2024.12.13

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);

const wines = input.slice(1).map(Number);

const dp = Array.from({ length: N }, () => Array(3).fill(0));
dp[0][1] = wines[0];

for (let i = 1; i < N; i++) {
  dp[i][0] = Math.max(...dp[i - 1]);
  dp[i][1] = dp[i - 1][0] + wines[i];
  dp[i][2] = dp[i - 1][1] + wines[i];
}

console.log(Math.max(...dp[N - 1]));
