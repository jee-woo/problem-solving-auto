// 2024.12.17

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);
let sums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(BigInt);

const dp = new Array(1001).fill(0);

dp[1] = BigInt(10);

for (let i = 2; i <= N; i++) {
  let sum = BigInt(0);

  for (let j = 1; j <= 9; j++) {
    sum += sums[j];
  }

  const newSums = new Array(10);
  newSums[9] = sum;
  for (let j = 8; j >= 1; j--) {
    newSums[j] = newSums[j + 1] - sums[j + 1];
  }

  dp[i] = (dp[i - 1] + sum) % BigInt(10007);
  sums = newSums;
}

// console.table(dp);
console.log(String(dp[N]));
