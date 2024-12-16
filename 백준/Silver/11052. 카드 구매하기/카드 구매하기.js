// 2024.12.16

const fs = require('fs');

const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input[0]);
const p = input[1].split(' ').map(Number);
p.unshift(0);

const dp = new Array(N + 1).fill(0);

for (let i = 1; i <= N; i++) {
  let max = 0;
  dp[i] = p[i];
  for (let j = 1; j <= i; j++) {
    max = Math.max(max, dp[j] + dp[i - j]);
  }
  dp[i] = max;
}

console.log(dp[N]);
