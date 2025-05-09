// 2025.05.09

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const n = Number(input[0]);
const innings = input.slice(1).map((v) => v.split(' ').map(Number));

const perm = new Array(9);
perm[3] = 0;
const visited = new Array(9).fill(false);
visited[0] = true;

let max = 0;

const move = (count, lu) => {
  let point = 0;
  for (let i = 3; i >= 0; i--) {
    if (lu[i] === 1) {
      if (i > 0) lu[i] = 0;
      if (i + count >= 4) {
        point += 1;
        continue;
      } else {
        lu[i + count] = 1;
      }
    }
  }
  return point;
};

const inn = () => {
  let hitman = -1; // 타석 index
  let totalPoint = 0;
  // inning 순회
  for (let i = 0; i < n; i++) {
    let out = 0;
    const lu = [1, 0, 0, 0];
    while (out < 3) {
      hitman = (hitman + 1) % 9;
      let command = innings[i][perm[hitman]];
      if (command === 0) {
        out += 1;
        continue;
      }
      totalPoint += move(command, lu);
    }
  }
  max = Math.max(totalPoint, max);
};

const permutation = (level) => {
  if (level === 9) {
    inn();
    return;
  }

  if (level === 3) {
    level += 1;
  }

  for (let i = 0; i < 9; i++) {
    if (visited[i]) continue;
    perm[level] = i;
    visited[i] = true;
    permutation(level + 1);
    visited[i] = false;
  }
};

permutation(0);

console.log(max);