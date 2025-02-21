// 2025.02.21

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);
const nums = [-1, ...input[1].split(' ').map(Number)];
const M = Number(input[2]);
const q = input.slice(3).map((v) => v.split(' ').map(Number));
// console.table(q);

const dp = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0));

let minus;
// 대각1
for (let i = 1; i <= N; i++) {
  dp[i][i] = 1;
  minus = 1;
  for (let j = i + 1; j <= N; j++) {
    // console.log(i - minus, j);
    if (i - minus <= 0) break;

    if (dp[i + 1 - minus][j - 1] === 0) break;
    if (nums[i - minus] === nums[j]) dp[i - minus][j] = 1;
    minus++;
  }
}

// 대각2
for (let i = 1; i < N; i++) {
  if (nums[i] === nums[i + 1]) dp[i][i + 1] = 1;
  // else break;
  minus = 1;

  for (let j = i + 2; j <= N; j++) {
    if (i - minus <= 0) break;

    if (dp[i + 1 - minus][j - 1] === 0) break;
    if (nums[i - minus] === nums[j]) dp[i - minus][j] = 1;
    minus++;
  }
}

// console.table(dp);

let answer = '';
for (let [s, e] of q) {
  answer += dp[s][e] + '\n';
}

console.log(answer.trim());