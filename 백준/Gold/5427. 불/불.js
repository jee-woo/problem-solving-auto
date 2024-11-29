// 2024.11.29

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const T = Number(input[0]);

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

    if (sr === -1 || sr === h || sc === -1 || sc === w) {
      console.log(sec);
      return;
    }

    // 불 번지기
    if (prevSec < sec && fQueue.length) {
      prevSec++;

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
            building[nfr][nfc] !== '.'
          )
            continue;

          building[nfr][nfc] = '*';
          newQ.push([nfr, nfc]);
        }
      });

      fQueue.push(newQ);
    }
    for (let [dx, dy] of dxdy) {
      // 상근이 이동하기
      const [nsr, nsc] = [sr + dx, sc + dy];

      if (
        nsr < -1 ||
        nsc < -1 ||
        nsr > h ||
        nsc > w ||
        visited[nsr]?.[nsc] ||
        (building[nsr]?.[nsc] && building[nsr][nsc] !== '.')
      )
        continue;

      queue.push([nsr, nsc, sec + 1]);
      if (nsr >= 0 && nsc >= 0 && nsr < h && nsc < w) visited[nsr][nsc] = true;
    }
  }

  console.log('IMPOSSIBLE');
};

let idx = 1;
for (let t = 0; t < T; t++) {
  const [w, h] = input[idx].split(' ').map(Number);
  const fQueue = [[]];
  let start;
  const building = input.slice(idx + 1, idx + 1 + h).map((v, i) => {
    const arr = v.split('');
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] === '@') {
        start = [i, j];
      } else if (arr[j] === '*') {
        fQueue[0].push([i, j]);
      }
    }
    return arr;
  });

  bfs(building, fQueue, start);

  idx += h + 1;
}
