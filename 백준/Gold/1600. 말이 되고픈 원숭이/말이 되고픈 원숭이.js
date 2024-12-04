// 2024.12.04

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const K = Number(input[0]);
const [W, H] = input[1].split(' ').map(Number);
const zoo = input.slice(2).map((v) => v.split(' ').map(Number));

const bfs = () => {
  const visited = Array.from({ length: H }, () =>
    Array.from({ length: W }, () => Array(K + 1).fill(0))
  );

  const queue = [[0, 0, 0, 0]];

  // let idx = 0;
  while (queue.length) {
    // while (idx < queue.length) {
    const [r, c, n, horse] = queue.shift();
    // const [r, c, n, horse] = queue[idx++];
    if (r === H - 1 && c === W - 1) {
      console.log(n);
      return;
    }

    const drdc = [
      [r, c + 1],
      [r, c - 1],
      [r + 1, c],
      [r - 1, c],
    ];

    for (let [dr, dc] of drdc) {
      if (dr < 0 || dc < 0 || dr >= H || dc >= W) continue;
      if (zoo[dr][dc] === 1) continue;
      if (visited[dr][dc][horse]) continue;
      queue.push([dr, dc, n + 1, horse]);
      visited[dr][dc][horse] = true;
    }

    if (horse < K) {
      const hrhc = [
        [r - 2, c - 1],
        [r - 1, c - 2],
        [r + 2, c + 1],
        [r + 1, c + 2],
        [r - 2, c + 1],
        [r - 1, c + 2],
        [r + 2, c - 1],
        [r + 1, c - 2],
      ];

      for (let [hr, hc] of hrhc) {
        if (hr < 0 || hc < 0 || hr >= H || hc >= W) continue;
        if (zoo[hr][hc] === 1) continue;
        if (visited[hr][hc][horse + 1]) continue;
        queue.push([hr, hc, n + 1, horse + 1]);
        visited[hr][hc][horse + 1] = true;
      }
    }
  }

  console.log(-1);
};

bfs();
