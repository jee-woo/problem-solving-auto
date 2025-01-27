// 2025.01.27

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [M, N] = input[0].split(' ').map(Number);
const sticks = input[1]
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b);

let min = 1;
let max = sticks[sticks.length - 1];
let answer = 0;

const canMake = (n) => {
  let enable = 0;
  for (let stick of sticks) {
    let share = Math.floor(stick / n);
    if (share >= 1) {
      enable += share;
    }
    if (enable >= M) return true;
  }

  if (enable >= M) return true;
  return false;
};

let l = 0;
let r = sticks[N - 1] + 1;
let m = Math.floor((l + r) / 2);

while (l < m && m < r) {
  if (canMake(m)) l = m;
  else r = m;
  m = Math.floor((l + r) / 2);
}

console.log(m);