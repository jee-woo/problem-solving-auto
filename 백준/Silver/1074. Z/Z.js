// 2024.11.04

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, '1074.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, r, c] = input[0].split(' ').map(Number);

let answer = 0;

z(0, 0, Math.pow(2, N));

function z(x, y, size) {
  if (x === r && y === c) {
    console.log(answer);
    return;
  }

  if (r >= x && r < x + size && c >= y && c < y + size) {
    let half = size / 2;
    z(x, y, half);
    z(x, y + half, half);
    z(x + half, y, half);
    z(x + half, y + half, half);
  } else {
    answer += size * size;
  }
}
