// 2024.11.13

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);

solution(M);

function solution(m) {
  let answer = '';
  const backtrack = (depth, seq) => {
    if (depth === m) {
      answer += seq.join(' ') + '\n';
      return;
    }

    for (let i = 1; i <= N; i++) {
      if (i < seq[seq.length - 1]) continue;
      backtrack(depth + 1, [...seq, i]);
    }
  };

  backtrack(0, []);
  console.log(answer.trim());
}
