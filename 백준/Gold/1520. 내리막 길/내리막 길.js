const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [M, N] = input[0].split(' ').map(Number);

const map = input.slice(1).map((v) => v.split(' ').map(Number));
const dp = Array.from({ length: M }, () => Array(N).fill(-1));

const dfs = (r, c) => {
  if (r === M - 1 && c === N - 1) return 1;

  if (dp[r][c] > -1) {
    return dp[r][c];
  }
  dp[r][c] = 0;

  const drdc = [
    [r + 1, c],
    [r - 1, c],
    [r, c + 1],
    [r, c - 1],
  ];

  for (let [dr, dc] of drdc) {
    if (dr < 0 || dc < 0 || dr >= M || dc >= N) continue;
    if (map[dr][dc] >= map[r][c]) continue;
    dp[r][c] += dfs(dr, dc);
  }

  // console.table(dp);

  return dp[r][c];
};

const res = dfs(0, 0);
console.log(res);
