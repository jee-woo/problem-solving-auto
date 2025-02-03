// 2025.02.03

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);
const K = Number(input[1]);

const apples = input.slice(2, 2 + K).map((v) => v.split(' ').map(Number));
const L = Number(input[2 + K]);
const directions = input.slice(3 + K).map((v) => v.split(' '));

const map = Array.from({ length: N }, () => Array.from({ length: N }, () => 0));
let length = 1;

// 0: nothing, 1: snake, 2: apple
map[0][0] = 1;

apples.forEach(([r, c]) => {
  map[r - 1][c - 1] = 2;
});

let sec = 0;
let hr = 0,
  hc = 0,
  tr = 0,
  tc = 0;

let dr = [-1, 0, 1, 0]; // 북 동 남 서
let dc = [0, 1, 0, -1];

let directionIdx = 0;
let d = 1; // 처음에는 동쪽

// console.table(directions);

const dq = [];

while (true) {
  sec++;

  // 머리를 늘려 앞으로 전진
  hr += dr[d];
  hc += dc[d];

  // 몸에 머리 박으면 멈추기
  if (hr < 0 || hr >= N || hc < 0 || hc >= N || map[hr][hc] === 1) {
    break;
  }

  // 사과 X
  if (map[hr][hc] === 0) {
    map[tr][tc] = 0;
    // tr += dr[d];
    // tc += dc[d];
    let nowD = dq.shift() ?? d;
    tr += dr[nowD];
    tc += dc[nowD];
  }
  // 사과 O
  else if (map[hr][hc] === 2) {
    length++;
  }
  map[hr][hc] = 1;

  // 회전
  if (directionIdx < L && +directions[directionIdx][0] === sec) {
    if (directions[directionIdx][1] === 'L') {
      d = (d + 7) % 4;
    } else {
      d = (d + 1) % 4;
    }
    directionIdx++;
  }
  dq.push(d);

  // console.log('direction', d);
  // console.table(map);
}

console.log(sec);
