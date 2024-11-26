// 2024.11.26

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [m, n, k] = input[0].split(' ').map(Number);
const xys = input.slice(1).map((v) => v.split(' ').map(Number));
const checked = new Array(m).fill(null).map(() => new Array(n).fill(false));

const paper = new Array(m).fill(null).map(() => new Array(n).fill(0));

xys.forEach(([x1, y1, x2, y2]) => {
  for (let i = x1; i < x2; i++) {
    for (let j = y1; j < y2; j++) {
      paper[j][i] = 1;
    }
  }
});

const sizes = [];

const bfs = (startX, startY) => {
  let size = 0;
  const queue = [[startX, startY]];
  while (queue.length) {
    const [row, col] = queue.shift();
    const dxdy = [
      [row - 1, col],
      [row, col - 1],
      [row + 1, col],
      [row, col + 1],
    ];
    size++;

    dxdy.forEach(([x, y]) => {
      if (
        x >= 0 &&
        y >= 0 &&
        x < m &&
        y < n &&
        !checked[x][y] &&
        paper[x][y] === 0
      ) {
        queue.push([x, y]);
        checked[x][y] = true;
      }
    });
  }
  sizes.push(size);
};

for (let i = 0; i < m; i++) {
  for (let j = 0; j < n; j++) {
    if (paper[i][j] === 0 && !checked[i][j]) {
      checked[i][j] = true;
      bfs(i, j);
    }
  }
}

console.log(sizes.length);
console.log(sizes.sort((a, b) => a - b).join(' '));
