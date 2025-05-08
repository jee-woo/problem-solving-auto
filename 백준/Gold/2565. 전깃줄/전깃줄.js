// 2025.05.08

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const n = Number(input[0]);
const lines = input.slice(1).map((v) => v.split(' ').map(Number));

lines.sort((a, b) => a[0] - b[0]);

const lineB = lines.map((v) => v[1]);

const dp = Array(n).fill(1);
for (let i = 1; i < n; i++) {
  for (let j = 0; j < i; j++) {
    if (lineB[i] > lineB[j]) {
      dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }
}
let max = 0;
max = Math.max(...dp);

console.log(n - max);
/*

A번 전깃줄 번호순으로 정렬
B번 전깃줄의 순서에서 LIS가 최대로 되게

answer = n - LIS 최댓값

*/
