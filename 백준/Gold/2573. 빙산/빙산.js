// 2024.12.03

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
let iceberg = input.slice(1).map((v) => v.split(' ').map(Number));

const bfs = (sr, sc, visited) => {
  const queue = [[sr, sc]];

  while (queue.length) {
    const [r, c] = queue.shift();

    const dxdy = [
      [r, c + 1],
      [r, c - 1],
      [r + 1, c],
      [r - 1, c],
    ];

    for (let [dx, dy] of dxdy) {
      if (dx < 0 || dy < 0 || dx >= N || dy >= M) continue;
      if (visited[dx][dy]) continue;
      if (iceberg[dx][dy] === 0) continue;
      queue.push([dx, dy]);
      visited[dx][dy] = true;
    }
  }
};

const countIce = () => {
  let ice = 0;
  const visited = Array.from({ length: N }, () => Array(M).fill(false));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (iceberg[i][j] > 0 && !visited[i][j]) {
        visited[i][j] = true;
        bfs(i, j, visited);
        ice++;
      }
    }
  }

  return ice;
};

const meltIce = () => {
  const newIceberg = Array.from({ length: N }, () => Array(M).fill(0));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (iceberg[i][j] > 0) {
        const water =
          Boolean(iceberg[i - 1][j] === 0) +
          Boolean(iceberg[i + 1][j] === 0) +
          Boolean(iceberg[i][j - 1] === 0) +
          Boolean(iceberg[i][j + 1] === 0);
        let newIce = iceberg[i][j] - Math.min(water, iceberg[i][j]);
        newIceberg[i][j] = newIce;
      }
    }
  }

  iceberg = newIceberg;
};

const solution = () => {
  let year = 0;
  while (true) {
    const ices = countIce();
    // console.table(iceberg);

    if (ices === 0) {
      console.log(0);
      return;
    }
    if (ices >= 2) {
      console.log(year);
      return;
    }

    meltIce();
    year++;
  }
};

solution();
