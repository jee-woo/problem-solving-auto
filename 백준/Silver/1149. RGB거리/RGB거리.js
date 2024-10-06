// 2024.10.06

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input[0]); // 집의 수

const prices = input.slice(1).map((v) => v.split(' ').map(Number));

let min = Number.MAX_SAFE_INTEGER;

// 마지막이 본인 색상이 아닌 이전 집까지의 합 + 본인 색상의 값
// 0: R, 1: G, 2: B

const dp = new Array(N).fill(null).map(() => new Array(3).fill(0));

dp[0] = [prices[0][0], prices[0][1], prices[0][2]];

for (let i = 1; i < N; i++) {
  for (let c = 0; c < 3; c++) {
    dp[i][c] =
      Math.min(dp[i - 1][(c + 1) % 3], dp[i - 1][(c + 2) % 3]) + prices[i][c];
  }
}

console.log(Math.min(dp[N - 1][0], dp[N - 1][1], dp[N - 1][2]));
