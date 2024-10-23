// 2024.10.23

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);

const tree = input.slice(1).map((v) => v.split(' ').map(Number));

const dp = new Array(N).fill(null).map((_, i) => new Array(i + 1));

dp[0] = [tree[0][0]];

let max = tree[0][0];

for (let i = 1; i < N; i++) {
  for (let j = 0; j < i + 1; j++) {
    if (j === 0) dp[i][j] = dp[i - 1][j] + tree[i][j];
    else if (j === i) dp[i][j] = dp[i - 1][j - 1] + tree[i][j];
    else dp[i][j] = Math.max(dp[i - 1][j - 1], dp[i - 1][j]) + tree[i][j];
    max = Math.max(max, dp[i][j]);
  }
}

console.log(max);