// 2024.12.05

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

  isEmpty() {
    return this.size === 0;
  }

  enqueue(data) {
    const newNode = new Node(data);
    if (this.isEmpty()) this.front = newNode;
    else this.rear.next = newNode;
    this.rear = newNode;
    this.size++;
  }

  dequeue() {
    if (this.isEmpty()) return;
    const data = this.front.data;
    this.front = this.front.next;
    this.size--;
    return data;
  }
}

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const solution = (map, keys, h, w) => {
  // console.table(map);
  const visited = Array.from({ length: h }, () => Array(w).fill(-1));
  const picked = Array.from({ length: h }, () => Array(w).fill(false));

  let docs = 0;
  // console.log(keys);

  const bfs = (sr, sc) => {
    // console.log(sr, sc);
    const queue = new Queue();
    queue.enqueue([sr, sc, keys.size]);
    visited[sr][sc] = keys.size;

    while (!queue.isEmpty()) {
      const [r, c] = queue.dequeue();
      // console.log(r, c);
      if (map[r][c] === '$' && !picked[r][c]) {
        docs++;
        picked[r][c] = true;
      }
      if (/^[a-z]$/.test(map[r][c])) keys.add(map[r][c].toUpperCase());

      for (let [dr, dc] of [
        [r + 1, c],
        [r - 1, c],
        [r, c + 1],
        [r, c - 1],
      ]) {
        if (dr < 0 || dc < 0 || dr >= h || dc >= w) continue;
        if (visited[dr][dc] === keys.size) continue;
        if (map[dr][dc] === '*') continue;
        if (
          map[dr][dc] === '.' ||
          /^[a-z]$/.test(map[dr][dc]) ||
          map[dr][dc] === '$' ||
          (/^[A-Z]$/.test(map[dr][dc]) && keys.has(map[dr][dc]))
        ) {
          queue.enqueue([dr, dc]);
          visited[dr][dc] = keys.size;
        }
      }
    }
  };

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (i !== 0 && j !== 0 && i !== h - 1 && j !== w - 1) {
        continue;
      }
      if (visited[i][j] === keys.size) continue;
      bfs(i, j);
    }
  }

  // console.table(visited);
  console.log(docs);
};

let idx = 1;
while (true) {
  if (idx >= input.length) break;
  const [h, w] = input[idx++].split(' ').map(Number);
  const map = [
    '.'.repeat(w + 2).split(''),
    ...input.slice(idx, idx + h).map((v) => ['.', ...v.split(''), '.']),
    '.'.repeat(w + 2).split(''),
  ];
  idx += h;
  let keys = new Set();
  input[idx++].split('').forEach((k) => {
    if (k !== '0') keys.add(k.toUpperCase());
  });

  solution(map, keys, h + 2, w + 2);

  // break;
}
