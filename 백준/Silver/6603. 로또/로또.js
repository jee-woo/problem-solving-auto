// 2024.11.15

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const numbers = input.map((v) => v.split(' ').map(Number));

for (let i = 0; i < numbers.length - 1; i++) {
  solution(numbers[i].slice(1));
  if (i < numbers.length - 2) {
    console.log();
  }
}

function solution(arr) {
  const seqArr = [];
  const check = new Array(arr.length).fill(false);

  const backtrack = (depth, seq) => {
    if (depth === 6) {
      seqArr.push(seq.join(' '));
      return;
    }

    for (let i = 0; i < arr.length; i++) {
      if (!check[i] && (seq.length === 0 || seq[seq.length - 1] <= arr[i])) {
        check[i] = true;
        backtrack(depth + 1, [...seq, arr[i]]);
        check[i] = false;
      }
    }
  };

  backtrack(0, []);

  console.log(seqArr.join('\n'));
}
