// 2024.11.13

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);

solution(M);

function solution(m) {
  const check = new Array(N + 1).fill(false);

  const backtrack = (depth, seq) => {
    if (depth === m) {
      console.log(seq.join(' '));
      return;
    }

    for (let i = 1; i <= N; i++) {
      if (!check[i] && (i > seq[seq.length - 1] || seq.length === 0)) {
        check[i] = true;
        backtrack(depth + 1, [...seq, i]);
        check[i] = false;
      }
    }
  };

  backtrack(0, []);
}
