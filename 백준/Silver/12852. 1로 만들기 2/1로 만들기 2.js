// 2024.12.10

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);
// const N = 4;
const d = new Array(N + 1).fill(null);
d[0] = 0;
d[1] = 0;
d[2] = 1;
d[3] = 1;

const way = new Array(N + 1).fill(1);
way[0] = 0;
let min;

for (let i = 4; i <= N; i++) {
  if (i % 2 === 0 && i % 3 === 0) {
    min = Math.min(d[i - 1], d[i / 2], d[i / 3]);
  } else if (i % 2 === 0) {
    min = Math.min(d[i - 1], d[i / 2]);
  } else if (i % 3 === 0) {
    min = Math.min(d[i - 1], d[i / 3]);
  } else {
    min = d[i - 1];
  }
  d[i] = min + 1;

  if (min === d[i / 3]) way[i] = i / 3;
  else if (min === d[i / 2]) way[i] = i / 2;
  else if (min === d[i - 1]) way[i] = i - 1;
  // console.log(i, d[i]);
}
// console.log(way);

let num = N;
let answer = `${N}`;
while (true) {
  if (num === 1) break;
  const next = way[num];
  answer += ' ' + next;
  num = next;
}

console.log(d[N]);

console.log(answer);