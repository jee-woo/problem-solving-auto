// 2025.02.04

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, L, R] = input[0].split(' ').map(Number);

const contries = input.slice(1).map((v) => v.split(' ').map(Number));

const dr = [-1, 0, 1, 0];
const dc = [0, 1, 0, -1];
let visited = Array.from({ length: N }, () => Array(N).fill(0));
let contryIdx = 1;

const bfs = (sr, sc) => {
  const queue = [[sr, sc]];
  let nr, nc;

  visited[sr][sc] = contryIdx;
  let population = 0;
  let subs;
  let contryCount = 1;

  while (queue.length) {
    const [r, c] = queue.shift();
    population += contries[r][c];

    for (let i = 0; i < 4; i++) {
      nr = r + dr[i];
      nc = c + dc[i];

      if (nr < 0 || nr >= N || nc < 0 || nc >= N || visited[nr][nc]) continue;

      subs = Math.abs(contries[nr][nc] - contries[r][c]);
      if (subs >= L && subs <= R) {
        queue.push([nr, nc]);
        visited[nr][nc] = contryIdx;
        // didMoved = true;
        contryCount++;
      }
    }
  }

  // contryIdx++;
  return [contryCount > 1, Math.floor(population / contryCount)];
};

let moved;
let day = 0;

while (true) {
  // console.table(contries);
  moved = false;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (visited[i][j]) continue;
      const [didMoved, average] = bfs(i, j);
      if (didMoved) {
        moved = true;
        setPopulation(average, contryIdx);
      }
      contryIdx++;
    }
  }
  if (!moved) break;
  day++;
  visited = Array.from({ length: N }, () => Array(N).fill(0));
}

function setPopulation(p, ci) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (visited[i][j] === ci) {
        contries[i][j] = p;
      }
    }
  }
}

console.log(day);
