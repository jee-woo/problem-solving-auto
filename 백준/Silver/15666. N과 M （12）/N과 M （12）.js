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

const numSet = new Set(numbers);
const numArr = Array.from(numSet);

solution(M, numArr);

function solution(m, arr) {
  const seqSet = new Set();

  const backtrack = (depth, seq) => {
    if (depth === m) {
      seqSet.add(seq.join(' '));
      return;
    }

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] < seq[seq.length - 1] && seq.length > 0) continue;
      backtrack(depth + 1, [...seq, arr[i]]);
    }
  };

  backtrack(0, []);

  const seqArr = Array.from(seqSet);
  console.log(seqArr.join('\n'));
}
