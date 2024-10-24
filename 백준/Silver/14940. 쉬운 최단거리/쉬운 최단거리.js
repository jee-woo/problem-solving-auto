// 2024.10.24

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);

let x, y;
const board = input.slice(1).map((v, i) =>
  v.split(' ').map((n, j) => {
    const num = Number(n);
    if (num === 2) (x = i), (y = j);
    return num;
  })
);
const dist = new Array(n).fill(null).map((_, i) =>
  new Array(m).fill(null).map((_, j) => {
    if (board[i][j] === 0) return 0;
    return -1;
  })
);
dist[x][y] = 0;

const queue = [[x, y, 0]];
const dxdy = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const visited = new Array(n).fill(null).map(() => new Array(m).fill(false));
visited[x][y] = true;

while (queue.length > 0) {
  const [nowX, nowY, nowDist] = queue.shift();

  dist[nowX][nowY] = nowDist;

  dxdy.forEach(([dx, dy]) => {
    let nextX = nowX + dx;
    let nextY = nowY + dy;
    if (nextX < 0 || nextY < 0 || nextX >= n || nextY >= m) return;
    if (!visited[nextX][nextY] && board[nextX][nextY] !== 0) {
      queue.push([nextX, nextY, nowDist + 1]);
      visited[nextX][nextY] = true;
    }
  });
}

console.log(dist.map((v) => v.join(' ')).join('\n'));
