// 2024.11.13

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const numbers = input[1]
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b);

solution(M);

function solution(m) {
  let answer = '';
  const check = new Array(N);
  const backtrack = (depth, seq) => {
    if (depth === m) {
      answer += seq.join(' ') + '\n';
      return;
    }

    for (let i = 0; i < N; i++) {
      if (!check[i]) {
        check[i] = true;
        backtrack(depth + 1, [...seq, numbers[i]]);
        check[i] = false;
      }
    }
  };

  backtrack(0, []);
  console.log(answer.trim());
}
