// 2024.12.13

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [T, W] = input[0].split(' ').map(Number);
const fall = input.slice(1).map(Number);

const dp = Array.from({ length: T }, () =>
  Array.from({ length: W + 1 }, () => Array(2))
);

dp[0][0] = [fall[0] === 1 ? 1 : 0, 1];
dp[0][1] = [fall[0] === 2 ? 1 : 0, 2];

for (let i = 1; i < T; i++) {
  // console.table(dp);

  // console.log(i);
  if (fall[i] === dp[i - 1][0][1]) {
    dp[i][0] = [dp[i - 1][0][0] + 1, dp[i - 1][0][1]];
  } else {
    dp[i][0] = [dp[i - 1][0][0], dp[i - 1][0][1]];
  }
  for (let j = 1; j <= W; j++) {
    if (j - 1 > i) break;
    // console.log(
    //   Number(dp[i - 1][j][1] === fall[i]),
    //   Number((dp[i - 1][j - 1][1] % 2) + 1 === fall[i])
    // );
    let stopScore = dp[i - 1][j][0] + Number(dp[i - 1][j][1] === fall[i]);
    let movScore =
      dp[i - 1][j - 1][0] + Number((dp[i - 1][j - 1][1] % 2) + 1 === fall[i]);
    if (stopScore > movScore) {
      dp[i][j] = [stopScore, dp[i - 1][j][1]];
    } else {
      dp[i][j] = [movScore, (dp[i - 1][j - 1][1] % 2) + 1];
    }
  }
}
// console.table(dp);

console.log(Math.max(...dp[T - 1].map((v) => v[0])));
