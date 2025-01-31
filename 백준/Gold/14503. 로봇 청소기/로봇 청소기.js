// 2025.01.31

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const [r, c, d] = input[1].split(' ').map(Number);
// d -> 0: 북, 1: 동, 2: 남, 3: 서

const room = input.slice(2).map((v) => v.split(' ').map(Number));

let dr = [-1, 0, 1, 0]; // 북 동 남 서
let dc = [0, 1, 0, -1];

const checkCleanNsew = (r, c) => {
  for (let i = 0; i < 4; i++) {
    if (room[r + dr[i]][c + dc[i]] === 0) return true;
  }
  return false;
};

// 0: 청소되지 않음, 1: 벽, -1: 청소됨
const clean = (r, c, d) => {
  let count = 0;

  while (true) {
    if (r < 0 || r >= N || c < 0 || c >= M || room[r][c] === 1) break;
    if (room[r][c] === 0) {
      room[r][c] = -1;
      count++;
    }
    if (!checkCleanNsew(r, c)) {
      // 뒤로 후진
      r -= dr[d];
      c -= dc[d];
      continue;
    } else {
      for (let i = 0; i < 4; i++) {
        d = (d + 7) % 4;
        if (room[r + dr[d]][c + dc[d]] === 0) {
          r += dr[d];
          c += dc[d];
          break;
        }
      }
    }
  }

  return count;
};

const answer = clean(r, c, d);
console.log(answer);
