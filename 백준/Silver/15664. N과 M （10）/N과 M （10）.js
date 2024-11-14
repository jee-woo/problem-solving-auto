// 2024.11.14

const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const numbers = input[1]
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b);

solution(M, numbers);

function solution(m, arr) {
  const seqSet = new Set();
  const check = new Array(N).fill(false);

  const backtrack = (depth, seq) => {
    if (depth === m) {
      seqSet.add(seq.join(' '));
      return;
    }

    for (let i = 0; i < N; i++) {
      if (!check[i] && (seq.length === 0 || seq[seq.length - 1] <= arr[i])) {
        check[i] = true;
        backtrack(depth + 1, [...seq, arr[i]]);
        check[i] = false;
      }
    }
  };

  backtrack(0, []);

  const seqArr = Array.from(seqSet);

  console.log(seqArr.join('\n'));
}
