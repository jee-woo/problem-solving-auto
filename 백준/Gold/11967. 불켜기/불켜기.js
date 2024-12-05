// 2024.12.05

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);

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

const room = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => new Array(0))
);

for (let i = 1; i <= M; i++) {
  const [r, c, lr, lc] = input[i].split(' ').map(Number);
  room[r - 1][c - 1].push([lr - 1, lc - 1]);
}

const isOn = Array.from({ length: N }, () => Array(N).fill(false));
isOn[0][0] = true;

let light = 1;

const bfs = () => {
  const visited = Array.from({ length: N }, () => Array(N).fill(0));
  // const queue = [[0, 0]];
  const queue = new Queue();
  queue.enqueue([0, 0]);

  visited[0][0] = 1;

  let idx = 0;
  // while (queue.length) {
  // while (idx < queue.length) {
  while (!queue.isEmpty()) {
    const [r, c] = queue.dequeue();
    // const [r, c] = queue.shift();
    // const [r, c] = queue[idx++];

    // 불 켜기. 배열 pop
    while (room[r][c].length) {
      const [lr, lc] = room[r][c].pop();
      if (!isOn[lr][lc]) light++;
      isOn[lr][lc] = true;
    }

    // 이동하기
    const drdc = [
      [r - 1, c],
      [r + 1, c],
      [r, c - 1],
      [r, c + 1],
    ];

    for (let [dr, dc] of drdc) {
      if (dr < 0 || dc < 0 || dr >= N || dc >= N) continue;
      if (visited[dr][dc] === light) continue;
      if (!isOn[dr][dc]) continue;
      // queue.push([dr, dc]);
      queue.enqueue([dr, dc]);
      visited[dr][dc] = light;
    }
  }
};

bfs();

console.log(light);
