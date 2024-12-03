// 2024.12.03

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);

const map = input.slice(1).map((v) => v.split(' ').map(Number));

const visitMyIsland = (sr, sc, visited) => {
  const queue = [[sr, sc]];
  visited[sr][sc] = true;

  while (queue.length) {
    const [r, c] = queue.shift();

    const dxdy = [
      [r + 1, c],
      [r - 1, c],
      [r, c + 1],
      [r, c - 1],
    ];

    for (let [dx, dy] of dxdy) {
      if (dx < 0 || dy < 0 || dx >= N || dy >= N) continue;
      if (visited[dx][dy]) continue;
      if (
        map[dx][dy] === 1
        // &&
        // ((dx + 1 < N && map[dx + 1][dy]) ||
        //   (dx - 1 >= 0 && map[dx - 1][dy]) ||
        //   (dy + 1 < N && map[dx][dy + 1]) ||
        //   (dy - 1 >= 0 && map[dx][dy - 1]))
      ) {
        // console.log(dx, dy, '!!!!!!');
        queue.push([dx, dy]);
        visited[dx][dy] = true;
      }
    }
  }

  // console.log(sr, sc);
  // console.table(visited);
};

const getMinBridge = (sr, sc) => {
  const lineVisited = Array.from({ length: N }, () => Array(N).fill(false));
  lineVisited[sr][sc] = true;

  visitMyIsland(sr, sc, lineVisited);

  const queue = [];

  const dxdy = [
    [sr + 1, sc],
    [sr - 1, sc],
    [sr, sc + 1],
    [sr, sc - 1],
  ];
  for (let [dx, dy] of dxdy) {
    if (dx < 0 || dy < 0 || dx >= N || dy >= N) continue;
    if (map[dx][dy] === 0) {
      queue.push([dx, dy, 1]);
    }
  }

  while (queue.length) {
    const [r, c, size] = queue.shift();

    if (
      (map[r + 1]?.[c] === 1 && !lineVisited[r + 1]?.[c]) ||
      (map[r - 1]?.[c] === 1 && !lineVisited[r - 1]?.[c]) ||
      (map[r][c + 1] === 1 && !lineVisited[r][c + 1]) ||
      (map[r][c - 1] === 1 && !lineVisited[r][c - 1])
    ) {
      // console.log(r, c, size);
      // console.table(lineVisited);
      return size;
    }

    const dxdy = [
      [r + 1, c],
      [r - 1, c],
      [r, c + 1],
      [r, c - 1],
    ];

    for (let [dx, dy] of dxdy) {
      if (dx < 0 || dy < 0 || dx >= N || dy >= N) continue;
      if (lineVisited[dx][dy]) continue;

      queue.push([dx, dy, size + 1]);
      lineVisited[dx][dy] = true;
    }
  }
  return Number.MAX_SAFE_INTEGER;
};

const solution = () => {
  let min = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (
        map[i][j] === 1 &&
        ((i - 1 >= 0 && map[i - 1][j] === 0) ||
          (i + 1 < N && map[i + 1][j] === 0) ||
          (j - 1 >= 0 && map[i][j - 1] === 0) ||
          (j + 1 < N && map[i][j + 1] === 0))
      ) {
        min = Math.min(min, getMinBridge(i, j));
      }
    }
  }

  console.log(min);
};

solution();
