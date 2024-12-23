// 2024.12.23

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let idx = 1;
while (true) {
  if (!input[idx]) break;
  const N = Number(input[idx++]);
  const stickers = input
    .slice(idx, idx + 2)
    .map((v) => v.split(' ').map(Number));

  idx += 2;
  solution(N, stickers);
}

function solution(n, stickers) {
  const dp = Array.from({ length: n }, () => Array(3).fill(0));

  dp[0] = [0, stickers[0][0], stickers[1][0]];

  for (let i = 1; i < n; i++) {
    dp[i][0] = Math.max(...dp[i - 1]);
    dp[i][1] = Math.max(dp[i - 1][0], dp[i - 1][2]) + stickers[0][i];
    dp[i][2] = Math.max(dp[i - 1][0], dp[i - 1][1]) + stickers[1][i];
  }

  console.log(Math.max(...dp[n - 1]));
}
