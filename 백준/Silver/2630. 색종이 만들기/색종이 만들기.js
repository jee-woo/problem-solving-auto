// 2024.11.04

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input[0]);
const paper = input.slice(1).map((v) => v.split(' ').map(Number));
let white = 0;
let blue = 0;

fold(0, 0, N);
function fold(x, y, size) {
  const startColor = paper[x][y];
  let isSame = true;
  for (let i = x; i < x + size; i++) {
    for (let j = y; j < y + size; j++) {
      if (paper[i][j] !== startColor) {
        isSame = false;
        break;
      }
    }
    if (!isSame) break;
  }

  if (isSame) {
    if (startColor === 0) white += 1;
    else blue += 1;
    return;
  }

  fold(x, y, size / 2);
  fold(x + size / 2, y, size / 2);
  fold(x, y + size / 2, size / 2);
  fold(x + size / 2, y + size / 2, size / 2);
}

console.log(white);
console.log(blue);
