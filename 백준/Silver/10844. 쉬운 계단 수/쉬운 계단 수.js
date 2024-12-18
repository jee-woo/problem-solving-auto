// 2024.12.17

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input[0]);

const dp = Array.from({ length: N + 1 }, () => Array(10).fill(BigInt(1)));

dp[1][0] = BigInt(0);

const MOD = BigInt(1_000_000_000);

for (let i = 2; i <= N; i++) {
  dp[i][0] = dp[i - 1][1];
  dp[i][9] = dp[i - 1][8];
  for (let j = 1; j <= 8; j++) {
    dp[i][j] = (dp[i - 1][j - 1] + dp[i - 1][j + 1]) % MOD;
  }
}

console.log(String(dp[N].reduce((a, b) => (a + b) % MOD, BigInt(0))));
