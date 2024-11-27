// 2024.11.27

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);
const map = input.slice(1).map((v) => v.split('').map(Number));
const visited = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => false)
);
const complex = [];

const bfs = (startR, startC) => {
  const queue = [[startR, startC]];
  let size = 0;

  while (queue.length) {
    size++;
    const [nowR, nowC] = queue.shift();
    const dxdy = [
      [nowR + 1, nowC],
      [nowR - 1, nowC],
      [nowR, nowC + 1],
      [nowR, nowC - 1],
    ];

    for (let [r, c] of dxdy) {
      if (
        r < 0 ||
        c < 0 ||
        r >= N ||
        c >= N ||
        visited[r][c] ||
        map[r][c] === 0
      )
        continue;
      queue.push([r, c]);
      visited[r][c] = true;
    }
  }

  return size;
};

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (map[i][j] === 1 && !visited[i][j]) {
      visited[i][j] = true;
      let c = bfs(i, j);
      complex.push(c);
    }
  }
}

console.log(complex.length);
complex.sort((a, b) => a - b);
complex.forEach((v) => console.log(v));
