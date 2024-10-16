// 2024.10.16

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

class MinHeap {
  constructor() {
    this.heap = [];
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  getLeftChildIndex(index) {
    return 2 * index + 1;
  }

  getRightChildIndex(index) {
    return 2 * index + 2;
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (
      index > 0 &&
      this.heap[index][1] < this.heap[this.getParentIndex(index)][1]
    ) {
      // swap
      [this.heap[index], this.heap[this.getParentIndex(index)]] = [
        this.heap[this.getParentIndex(index)],
        this.heap[index],
      ];
      index = this.getParentIndex(index);
    }
  }

  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);

    return min;
  }

  heapifyDown(index) {
    let smallest = index;
    const leftChildIndex = this.getLeftChildIndex(index);
    const rightChildIndex = this.getRightChildIndex(index);

    if (
      leftChildIndex < this.heap.length &&
      this.heap[leftChildIndex][1] < this.heap[smallest][1]
    ) {
      smallest = leftChildIndex;
    }

    if (
      rightChildIndex < this.heap.length &&
      this.heap[rightChildIndex][1] < this.heap[smallest][1]
    ) {
      smallest = rightChildIndex;
    }

    if (smallest !== index) {
      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      this.heapifyDown(smallest);
    }
  }

  peek() {
    return this.heap.length === 0 ? null : this.heap[0];
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

const [V, E] = input[0].split(' ').map(Number);
const K = Number(input[1]);
const UVW = input.slice(2).map((v) => v.split(' ').map(Number));

solution(K, UVW);

function solution(k, uvw) {
  const minHeap = new MinHeap();
  const adjList = {};
  const prices = new Array(V + 1).fill(Infinity);
  prices[k] = 0;
  uvw.forEach(([u, v, w]) => {
    if (!adjList[u]) adjList[u] = [];
    adjList[u].push([v, w]);
  });

  const visited = new Array(V + 1).fill(false);

  minHeap.insert([k, prices[k]]);
  // console.log(adjList);

  while (!minHeap.isEmpty()) {
    const [nowV, nowPrice] = minHeap.extractMin();
    if (visited[nowV]) continue;
    visited[nowV] = true;

    if (!adjList[nowV]) continue;
    adjList[nowV].forEach(([toV, toW]) => {
      if (!visited[toV]) {
        prices[toV] = Math.min(toW + nowPrice, prices[toV]);
        minHeap.insert([toV, prices[toV]]);
      }
    });
    // console.log(minHeap.heap);
  }

  let answer = '';
  for (let i = 1; i <= V; i++) {
    answer += `${prices[i] === Infinity ? 'INF' : prices[i]}\n`;
  }
  console.log(answer.trim());
}
