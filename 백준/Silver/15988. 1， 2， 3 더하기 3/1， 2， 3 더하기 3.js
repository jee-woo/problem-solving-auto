// 2024.12.12

const fs = require('fs');

const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const dp = new Array(1_000_001);
dp[0] = BigInt(0);
dp[1] = BigInt(1);
dp[2] = BigInt(2);
dp[3] = BigInt(4);

let max = 4;

const solution = (n) => {
  for (let i = max; i <= n; i++) {
    dp[i] = (dp[i - 3] + dp[i - 2] + dp[i - 1]) % BigInt(1_000_000_009);
  }

  console.log(String(dp[n]));
  max = max > n ? max : n;
};

// solution(1_000_000);

const T = Number(input[0]);

for (let i = 0; i < T; i++) {
  const n = Number(input[i + 1]);
  solution(n);
}