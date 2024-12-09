// 2024.12.09

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const solution = (n) => {
  // dp[i] = dp[i-1] + dp[i-2] + dp[i-3] + 3
  const dp = [0, 1, 2, 4];

  for (let i = 4; i <= n; i++) {
    dp.push(dp[i - 3] + dp[i - 2] + dp[i - 1]);
  }

  console.log(dp[n]);
};

const T = Number(input[0]);

for (let i = 0; i < T; i++) {
  const n = Number(input[i + 1]);
  solution(n);
}
