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

const [N, K] = input.shift().split(' ').map(Number);

const bfs = () => {
  let k = K;
  const visited = Array.from({ length: 500_001 }, () => Array(2).fill(false));
  visited[N][N % 2] = true;
  const queue = new Queue();
  queue.enqueue(N); // n

  let move = 1;

  while (!queue.isEmpty()) {
    k += move;

    if (k > 500_000) {
      break;
    }
    if (visited[k][move % 2]) {
      console.log(move);
      return;
    }

    let size = queue.size;
    for (let i = 0; i < size; i++) {
      let n = queue.dequeue();

      const dn = [n - 1, n + 1, n * 2];

      for (let nn of dn) {
        if (nn < 0 || nn > 500_000) continue;
        if (nn === k) {
          console.log(move);
          return;
        }
        if (visited[nn][move % 2]) continue;
        queue.enqueue(nn);
        visited[nn][move % 2] = true;
      }
    }
    move++;
  }

  console.log(-1);
};

if (N === K) {
  console.log(0);
} else {
  bfs();
}
