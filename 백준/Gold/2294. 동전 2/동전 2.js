// 2024.10.15

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N, K] = input[0].split(' ').map(Number);
const coins = input.slice(1).map(Number);

console.log(solution(coins, K));

function solution(coins, m) {
  const dp = new Array(100_001).fill(Number.MAX_SAFE_INTEGER);
  dp[0] = 0;

  // coins
  for (let i = 0; i < coins.length; i++) {
    // dp
    for (let j = coins[i]; j <= m; j++) {
      dp[j] = Math.min(dp[j - coins[i]] + 1, dp[j]);
    }
  }

  if (dp[m] === Number.MAX_SAFE_INTEGER) return -1;

  return dp[m];
}

