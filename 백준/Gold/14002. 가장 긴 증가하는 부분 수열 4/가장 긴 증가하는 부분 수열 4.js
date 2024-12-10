// 2024.12.10

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);
const nums = input[1].split(' ').map(Number);

const dp = new Array(N).fill(1);
const way = new Array(N).fill(null);
let maxLength;
let answer = 1;
let answerIdx = 0;

for (let i = 1; i < N; i++) {
  let lowerExist = false;
  maxLength = -1;

  for (let j = 0; j < i; j++) {
    if (nums[j] < nums[i]) {
      lowerExist = true;
      if (dp[j] > maxLength) {
        maxLength = Math.max(dp[j], maxLength);
        way[i] = j;
      }
    }
  }

  if (lowerExist) {
    dp[i] = maxLength + 1;
  }

  if (dp[i] > answer) {
    answer = dp[i];
    answerIdx = i;
  }
}

let str = ``;
let idx = answerIdx;
while (true) {
  str = `${nums[idx]} ${str}`;

  idx = way[idx];

  if (idx === null) break;
}

console.log(answer);
console.log(str);
