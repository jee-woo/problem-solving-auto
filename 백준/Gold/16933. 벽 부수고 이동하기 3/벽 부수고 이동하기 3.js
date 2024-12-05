class Node {
  constructor(item) {
    this.item = item;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(item) {
    const node = new Node(item);
    if (this.head == null) {
      this.head = node;
    } else {
      this.tail.next = node;
    }

    this.tail = node;
    this.length += 1;
  }

  pop() {
    const popItem = this.head;
    this.head = this.head.next;
    this.length -= 1;
    return popItem.item;
  }
}

const fs = require("fs");
const input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const [N, M, K] = input.shift().split(" ").map(Number);
const board = input.map((v) => v.split(""));

const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

const q = new Queue();
let visited = Array.from(Array(N), () =>
  Array.from(Array(M), () => Array(K + 1).fill(0))
);

visited[0][0][0] = 1;
q.push([0, 0, 0, 1, true]);

while (q.length > 0) {
  const [x, y, cnt, dist, isNoon] = q.pop();

  if (x == N - 1 && y == M - 1) {
    process.exit(console.log(dist));
  }

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;

    if (!visited[nx][ny][cnt] && board[nx][ny] == "0") {
      visited[nx][ny][cnt] = true;
      q.push([nx, ny, cnt, dist + 1, !isNoon]);
    } else if (!visited[nx][ny][cnt + 1] && board[nx][ny] == "1" && cnt < K) {
      if (isNoon) {
        visited[nx][ny][cnt + 1] = true;
        q.push([nx, ny, cnt + 1, dist + 1, !isNoon]);
      } else {
        q.push([x, y, cnt, dist + 1, !isNoon]);
      }
    }
  }
}

console.log(-1);