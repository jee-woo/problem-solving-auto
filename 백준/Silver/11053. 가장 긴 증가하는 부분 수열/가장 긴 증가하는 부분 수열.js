// 2024.10.14

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');

const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);
const arr = input[1].split(' ').map(Number);

console.log(solution(arr));

function solution(arr) {
  const dp = new Array(arr.length).fill(1);

  dp[0] = 1;
  let maxLength = dp[0];
  let lowerExist;
  let answer = maxLength;

  for (let i = 1; i < arr.length; i++) {
    lowerExist = false;
    maxLength = -1;
    for (let j = 0; j < i; j++) {
      if (arr[j] < arr[i]) {
        lowerExist = true;
        maxLength = Math.max(dp[j], maxLength);
      }
    }

    if (lowerExist) dp[i] = maxLength + 1;
    else dp[i] = 1;

    answer = Math.max(answer, dp[i]);
  }

  // console.log(dp);

  return answer;
}
