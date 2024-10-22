// 2024.10.22

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);

const house = input.slice(1).map((v) => v.split(' ').map(Number));
const dp = new Array(N)
  .fill(null)
  .map(() => new Array(N).fill(null).map(() => new Array(3).fill(0)));

// 가: 0, 세: 1, 대: 2
dp[0][1][0] = 1;

for (let i = 0; i < N; i++) {
  for (let j = 2; j < N; j++) {
    if (house[i][j] === 1) continue;
    if (house[i][j - 1] !== 1) {
      dp[i][j][0] += dp[i][j - 1][0]; // 가로 -> 가로
      dp[i][j][0] += dp[i][j - 1][2]; // 대각 -> 가로
    }
    if (i > 0) {
      if (house[i - 1][j] !== 1) dp[i][j][1] += dp[i - 1][j][1]; // 세로 -> 세로
      dp[i][j][1] += dp[i - 1][j][2]; // 대각 -> 세로
    }
    if (i > 0 && j > 0 && house[i - 1][j - 1] !== 1) {
      if (house[i - 1][j] !== 1 && house[i][j - 1] !== 1) {
        dp[i][j][2] += dp[i - 1][j - 1][0]; // 가로 -> 대각
        dp[i][j][2] += dp[i - 1][j - 1][1]; // 세로 -> 대각
        dp[i][j][2] += dp[i - 1][j - 1][2]; // 대각 -> 대각
      }
    }
  }
}

// console.table(house);
// console.table(dp);

console.log(dp[N - 1][N - 1][0] + dp[N - 1][N - 1][1] + dp[N - 1][N - 1][2]);
