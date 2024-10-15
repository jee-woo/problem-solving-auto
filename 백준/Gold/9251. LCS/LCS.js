// 2024.10.15

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');

const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const strX = input[0].trim();
const strY = input[1].trim();

const dp = new Array(1000).fill(null).map(() => new Array(1000).fill(null));

let max = 0;
const lcs = (i, j) => {
  if (i < 0 || j < 0) return 0;
  if (strX[i] === strY[j]) {
    if (dp[i][j] !== null) return dp[i][j];
    dp[i][j] = lcs(i - 1, j - 1) + 1;
    max = Math.max(max, dp[i][j]);

    return dp[i][j];
  } else {
    let first;
    if (i === 0) first = 0;
    else if (dp[i - 1][j] === null) {
      first = lcs(i - 1, j);
      dp[i - 1][j] = first;
    } else {
      first = dp[i - 1][j];
    }
    let second;
    if (j === 0) second = 0;
    else if (dp[i][j - 1] === null) {
      second = lcs(i, j - 1);
      dp[i][j - 1] = second;
    } else {
      second = dp[i][j - 1];
    }
    return Math.max(first, second);
  }
};

lcs(strX.length - 1, strY.length - 1);

console.log(max);
