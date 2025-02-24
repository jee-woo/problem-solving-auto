// 2025.02.24

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);
const points = input
  .slice(1)
  .map((v) => v.split(' ').map(Number))
  .reverse();
points.push(points[0]);

let x, y;
let nx, ny;
let sum1 = 0,
  sum2 = 0;
for (let i = 0; i < N; i++) {
  [x, y] = points[i];
  [nx, ny] = points[i + 1];

  sum1 += x * ny;
  sum2 += y * nx;
}

console.log((Math.abs(sum1 - sum2) / 2).toFixed(1));
