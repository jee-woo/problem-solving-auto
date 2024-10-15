// 2024.10.15

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);
const things = input.slice(1).map((v) => v.split(' ').map(Number));

// console.log(things);

console.log(solution(K, things));

function solution(m, points) {
  const dp = new Array(m + 1).fill(0);
  dp[0] = 0;

  // points
  for (let i = 0; i < points.length; i++) {
    // dp
    for (let j = m; j >= points[i][0]; j--) {
      dp[j] = Math.max(dp[j - points[i][0]] + points[i][1], dp[j]);
    }
  }

  return dp[m];
}
