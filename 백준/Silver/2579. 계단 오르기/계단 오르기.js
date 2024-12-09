// 2024.12.09

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);
const stairs = input.map(Number);
stairs[0] = 0;

const dp = new Array(N + 1).fill(0);

dp[1] = stairs[1];

if (N >= 2) {
  dp[2] = stairs[1] + stairs[2];
}

for (let i = 3; i <= N; i++) {
  dp[i] = Math.max(dp[i - 3] + stairs[i - 1], dp[i - 2]) + stairs[i];
}

console.log(dp[N]);
