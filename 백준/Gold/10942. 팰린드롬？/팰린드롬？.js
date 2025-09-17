// 2025.02.21

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);
const nums = [-1, ...input[1].split(' ').map(Number)];
const M = Number(input[2]);
const q = input.slice(3).map((v) => v.split(' ').map(Number));

const dp = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0));

// 길이 1
for (let i = 1; i <= N; i++) dp[i][i] = 1;

// 길이 2
for (let i = 1; i < N; i++) {
  if (nums[i] === nums[i + 1]) dp[i][i + 1] = 1;
}

// 길이 3 이상
for (let len = 3; len <= N; len++) {
  for (let start = 1; start <= N - len + 1; start++) {
    const end = start + len - 1;
    // 양 끝이 같고, 그 안쪽이 팰린드롬이라면 현재 구간도 팰린드롬
    if (nums[start] === nums[end] && dp[start + 1][end - 1] === 1) {
      dp[start][end] = 1;
    }
  }
}

let answer = '';
for (let [s, e] of q) {
  answer += dp[s][e] + '\n';
}

console.log(answer.trim());
