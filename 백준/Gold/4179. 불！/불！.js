// 2024.11.29

const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const bfs = (building, fQueue, [sr, sc]) => {
  const [h, w] = [building.length, building[0].length];
  const queue = [[sr, sc, 0]];
  const visited = Array.from({ length: h }, () => Array(w).fill(false));

  visited[sr][sc] = true;

  const dxdy = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];

  let prevSec = -1;

  while (queue.length) {
    const [sr, sc, sec] = queue.shift();

    // console.log(sr, sc);
    // console.table(building);

    if (sr === 0 || sr === h - 1 || sc === 0 || sc === w - 1) {
      console.log(sec + 1);
      return;
    }

    // 불 번지기
    if (prevSec < sec && fQueue.length) {
      prevSec = sec;

      const fires = fQueue.shift();
      const newQ = [];

      fires.forEach(([fr, fc]) => {
        for (let [dx, dy] of dxdy) {
          const [nfr, nfc] = [fr + dx, fc + dy];
          if (
            nfr < 0 ||
            nfc < 0 ||
            nfr >= h ||
            nfc >= w ||
            building[nfr][nfc] === '#' ||
            building[nfr][nfc] === 'F'
          )
            continue;

          building[nfr][nfc] = 'F';
          newQ.push([nfr, nfc]);
        }
      });

      fQueue.push(newQ);
    }
    // 지훈이 이동하기
    for (let [dx, dy] of dxdy) {
      const [nsr, nsc] = [sr + dx, sc + dy];

      if (
        nsr < 0 ||
        nsc < 0 ||
        nsr >= h ||
        nsc >= w ||
        visited[nsr][nsc] ||
        building[nsr][nsc] !== '.'
      )
        continue;

      queue.push([nsr, nsc, sec + 1]);
      visited[nsr][nsc] = true;
    }
  }

  console.log('IMPOSSIBLE');
};

const [w, h] = input[0].split(' ').map(Number);
const fQueue = [[]];
let start;
const building = input.slice(1, 1 + w).map((v, i) => {
  const arr = v.split('');
  for (let j = 0; j < arr.length; j++) {
    if (arr[j] === 'J') {
      start = [i, j];
    } else if (arr[j] === 'F') {
      fQueue[0].push([i, j]);
    }
  }
  return arr;
});

bfs(building, fQueue, start);
