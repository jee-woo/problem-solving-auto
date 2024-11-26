// 2024.11.26

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);

const painting = input.slice(1).map((v) => v.split(' ').map(Number));

let count = 0;
let max = 0;
const visited = Array.from({ length: n }, () =>
  Array.from({ length: m }, () => false)
);

const bfs = (startRow, startCol) => {
  const queue = [[startRow, startCol]];
  let w = 0;
  while (queue.length) {
    const [row, col] = queue.shift();

    visited[row][col] = true;

    w++;
    max = Math.max(w, max);

    const dxdy = [
      [row - 1, col],
      [row, col - 1],
      [row + 1, col],
      [row, col + 1],
    ];

    for (let [r, c] of dxdy) {
      if (
        r < 0 ||
        c < 0 ||
        r >= n ||
        c >= m ||
        visited[r][c] ||
        painting[r][c] === 0
      ) {
        continue;
      }
      queue.push([r, c]);
      visited[r][c] = true;
    }
  }
};

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (visited[i][j] || painting[i][j] === 0) continue;
    visited[i][j] = true;
    bfs(i, j);
    count++;
  }
}

console.log(count);
console.log(max);
