// 2025.02.11

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const n = input[0];
const nArr = ['0', ...n.split('')];
const DIV = 1_000_000;

const dp = new Array(5001).fill(1);

dp[0] = nArr[1] === '0' ? 0 : 1;
dp[1] = nArr[1] === '0' ? 0 : 1;

let two;

let isPossible = true;

for (let i = 2; i < nArr.length; i++) {
  two = Number(`${nArr[i - 1]}${nArr[i]}`);
  if (nArr[i] === '0') {
    if (two > 26 || nArr[i - 1] === '0') {
      isPossible = false;
      break;
    }
    dp[i] = dp[i - 2];
  } else if (two <= 26 && two >= 10) {
    dp[i] = (dp[i - 1] + dp[i - 2]) % DIV;
  } else {
    dp[i] = dp[i - 1] % DIV;
  }
}
// console.table(dp.slice(0, nArr.length));

if (isPossible) {
  console.log(dp[nArr.length - 1]);
} else {
  console.log(0);
}
