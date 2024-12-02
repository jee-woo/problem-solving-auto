// 2024.12.02

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M, K] = input[0].split(' ').map(Number);
const map = input.slice(1).map((v) => v.split('').map(Number));

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

const bfs = () => {
  // const queue = [[0, 0, 1, 0]];
  const queue = new Queue();
  queue.enqueue([0, 0, 1, 0]);

  // 0 : 벽을 부수지 않음, n : 벽을 부순 개수
  const visited = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => Array(K + 1).fill(false))
  );
  visited[0][0][0] = true;

  // let idx = 0;
  // while (idx < queue.length) {
  // while (queue.length) {
  while (!queue.isEmpty()) {
    const [r, c, len, brk] = queue.dequeue();
    // const [r, c, len, brk] = queue.shift();
    // const [r, c, len, brk] = queue[idx++];

    if (r === N - 1 && c === M - 1) {
      console.log(len);
      // console.table(visited);
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

      if (map[nr][nc] === 0 && !visited[nr][nc][brk]) {
        // queue.push([nr, nc, len + 1, brk]);
        queue.enqueue([nr, nc, len + 1, brk]);
        visited[nr][nc][brk] = true;
      } else if (map[nr][nc] === 1 && brk < K && !visited[nr][nc][brk + 1]) {
        // queue.push([nr, nc, len + 1, brk + 1]);
        queue.enqueue([nr, nc, len + 1, brk + 1]);
        visited[nr][nc][brk + 1] = true;
      }
    }
  }

  console.log(-1);
};

bfs();
