// 2024.11.04

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const T = Number(input[0]);

const tests = input.slice(1).map(Number);
const memo = new Array(41).fill(null);

memo[0] = [0, 1, 0];
memo[1] = [1, 0, 1];

tests.forEach((v) => solution(v));

function solution(n) {
  const fibonacci = (n) => {
    if (n === 0) {
      return [0, 1, 0];
    } else if (n === 1) {
      return [1, 0, 1];
    } else {
      if (memo[n]) {
        return memo[n];
      }
      memo[n - 1] = fibonacci(n - 1);
      memo[n - 2] = fibonacci(n - 2);

      memo[n] = new Array(3);

      memo[n][0] = memo[n - 1][0] + memo[n - 2][0];
      memo[n][1] = memo[n - 1][1] + memo[n - 2][1];
      memo[n][2] = memo[n - 1][2] + memo[n - 2][2];

      return memo[n];
    }
  };
  fibonacci(n);
  console.log(memo[n][1], memo[n][2]);
}

