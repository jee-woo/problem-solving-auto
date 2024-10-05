// 2024.10.05

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);

const numbers = [0, ...input[1].split(' ').map(Number)];
const queries = input.slice(2).map((v) => v.split(' ').map(Number));
const dp = new Array(N + 1).fill(0);

dp[1] = numbers[1];

for (let i = 2; i <= N; i++) {
  dp[i] = dp[i - 1] + numbers[i];
}

let answer = '';

for (query of queries) {
  const [start, end] = [query[0], query[1]];

  answer += `${dp[end] - dp[start - 1]}\n`;
}

console.log(answer);
