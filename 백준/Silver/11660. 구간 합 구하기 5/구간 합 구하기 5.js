// 2024.10.04

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');

const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);

const table = input.slice(1, 1 + N).map((v) => v.split(' ').map(Number));
const xys = input.slice(1 + N).map((v) => v.split(' ').map(Number));

console.log(sumQueries(N, table, xys));

function sumQueries(N, grid, queries) {
  // 2차원 DP 배열 (누적 합 배열)
  const dp = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0));

  // DP 배열 채우기 (1,1부터 해당 좌표까지의 누적합 계산)
  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= N; j++) {
      dp[i][j] =
        grid[i - 1][j - 1] + dp[i - 1][j] + dp[i][j - 1] - dp[i - 1][j - 1];
    }
  }

  // 결과를 저장할 배열
  let results = [];

  // 각 쿼리 처리
  for (const [x1, y1, x2, y2] of queries) {
    const sum =
      dp[x2][y2] -
      (x1 > 1 ? dp[x1 - 1][y2] : 0) -
      (y1 > 1 ? dp[x2][y1 - 1] : 0) +
      (x1 > 1 && y1 > 1 ? dp[x1 - 1][y1 - 1] : 0);
    results.push(sum);
  }

  return results.join('\n');
}
