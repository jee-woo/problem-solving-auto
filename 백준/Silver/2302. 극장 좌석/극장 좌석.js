// 2024.12.16

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input[0]);
const M = Number(input[1]);
const dp = new Array(N + 1).fill(0);
const vip = new Array(N + 1).fill(false);

input.slice(2).forEach((v) => {
  vip[Number(v)] = true;
});

vip[0] = true;
dp[0] = 1;
dp[1] = 1;

// 왼쪽과 바꿀 수 있는지
for (let i = 2; i <= N; i++) {
  if (vip[i]) {
    dp[i] = dp[i - 1];
  } else {
    if (vip[i - 1]) dp[i] = dp[i - 1];
    else dp[i] = dp[i - 1] + dp[i - 2];
  }

}
// console.table(dp);

console.log(dp[N]);