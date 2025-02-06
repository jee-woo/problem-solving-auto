// 2025.02.06

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const arr = input.slice(1).map((v) => v.split(' ').map(Number));

const dp = Array.from({ length: N + 1 }, () => new Array(M + 1).fill(0)); // padding

for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= M; j++) {
    dp[i][j] =
      dp[i - 1][j] + dp[i][j - 1] + arr[i - 1][j - 1] - dp[i - 1][j - 1];
  }
}
let maxSum = Number.NEGATIVE_INFINITY;

// 2) 모든 (r1, c1), (r2, c2) 쌍을 순회하며 최대 합 갱신
for (let r1 = 1; r1 <= N; r1++) {
  for (let c1 = 1; c1 <= M; c1++) {
    for (let r2 = r1; r2 <= N; r2++) {
      for (let c2 = c1; c2 <= M; c2++) {
        const currentSum =
          dp[r2][c2] - dp[r1 - 1][c2] - dp[r2][c1 - 1] + dp[r1 - 1][c1 - 1];
        if (currentSum > maxSum) {
          maxSum = currentSum;
        }
      }
    }
  }
}
console.log(maxSum);
