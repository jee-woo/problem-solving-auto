// 2024.12.09

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);

const dp = new Array(N + 1).fill(BigInt(0));
dp[1] = BigInt(1);
dp[2] = BigInt(3);

for (let i = 3; i <= N; i++) {
  dp[i] = dp[i - 2] * BigInt(2) + dp[i - 1];
}

console.log(String(dp[N] % BigInt(10007)));
