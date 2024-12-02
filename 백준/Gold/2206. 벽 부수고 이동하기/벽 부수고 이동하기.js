// 2024.12.02

const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const map = input.slice(1).map((v) => v.split('').map(Number));

const bfs = () => {
  const queue = [[0, 0, 1, false]];
  const visited = Array.from({ length: N }, () => Array(M).fill(false));
  const brkVisited = Array.from({ length: N }, () => Array(M).fill(false));

  visited[0][0] = true;

  let idx = 0;
  while (idx < queue.length) {
    // while (queue.length) {
    // const [r, c, len, brk] = queue.shift();
    const [r, c, len, brk] = queue[idx++];

    if (r === N - 1 && c === M - 1) {
      console.log(len);
      return;
    }

    const dxdy = [
      [r, c + 1],
      [r, c - 1],
      [r + 1, c],
      [r - 1, c],
    ];

    for (let [nr, nc] of dxdy) {
      if (nr < 0 || nc < 0 || nr >= N || nc >= M) continue;

      if (
        map[nr][nc] === 0 &&
        ((!brk && !visited[nr][nc]) || (brk && !brkVisited[nr][nc]))
      ) {
        // queue.push([nr, nc, len + 1, brk || false, `${way} -> ${nr} ${nc}`]);
        queue.push([nr, nc, len + 1, brk || false]);
        if (brk) {
          brkVisited[nr][nc] = true;
        } else {
          visited[nr][nc] = true;
        }
      } else if (map[nr][nc] === 1 && !brk && !visited[nr][nc]) {
        // queue.push([nr, nc, len + 1, true, `${way} -> ${nr} ${nc}`]);
        queue.push([nr, nc, len + 1, true]);
        brkVisited[nr][nc] = true;
        // map[nr][nc] = 0;
      }
    }
  }

  console.log(-1);
};

bfs();
