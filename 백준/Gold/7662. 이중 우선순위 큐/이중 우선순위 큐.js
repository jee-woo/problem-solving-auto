const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const MinHeap = class {
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
      this.heap[index] < this.heap[this.getParentIndex(index)]
    ) {
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
      this.heap[leftChildIndex] < this.heap[smallest]
    ) {
      smallest = leftChildIndex;
    }

    if (
      rightChildIndex < this.heap.length &&
      this.heap[rightChildIndex] < this.heap[smallest]
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
};

const MaxHeap = class {
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
      this.heap[index] > this.heap[this.getParentIndex(index)]
    ) {
      [this.heap[index], this.heap[this.getParentIndex(index)]] = [
        this.heap[this.getParentIndex(index)],
        this.heap[index],
      ];
      index = this.getParentIndex(index);
    }
  }

  extractMax() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);

    return max;
  }

  heapifyDown(index) {
    let largest = index;
    const leftChildIndex = this.getLeftChildIndex(index);
    const rightChildIndex = this.getRightChildIndex(index);

    if (
      leftChildIndex < this.heap.length &&
      this.heap[leftChildIndex] > this.heap[largest]
    ) {
      largest = leftChildIndex;
    }

    if (
      rightChildIndex < this.heap.length &&
      this.heap[rightChildIndex] > this.heap[largest]
    ) {
      largest = rightChildIndex;
    }

    if (largest !== index) {
      [this.heap[index], this.heap[largest]] = [
        this.heap[largest],
        this.heap[index],
      ];
      this.heapifyDown(largest);
    }
  }

  peek() {
    return this.heap.length === 0 ? null : this.heap[0];
  }

  isEmpty() {
    return this.heap.length === 0;
  }
};

let inputLines = [];
rl.on("line", (line) => {
  inputLines.push(line);
}).on("close", () => {
  const T = parseInt(inputLines[0], 10);
  let answer = "";

  let index = 1; // 첫 번째 테스트 케이스의 시작 인덱스

  for (let t = 0; t < T; t++) {
    const k = parseInt(inputLines[index], 10); // k 값을 읽음
    const minHeap = new MinHeap();
    const maxHeap = new MaxHeap();
    const countMap = new Map(); // 각 숫자별 삭제된 횟수를 저장하는 맵

    for (let i = 1; i <= k; i++) {
      const [op, num] = inputLines[index + i].split(" ");
      const n = Number(num);

      if (op === "I") {
        minHeap.insert(n);
        maxHeap.insert(n);
        countMap.set(n, (countMap.get(n) || 0) + 1); // 삽입할 때 카운터 증가
      } else if (op === "D") {
        if (n === 1) {
          const max = maxHeap.extractMax();
          if (max !== null) countMap.set(max, (countMap.get(max) || 0) - 1); // 최댓값 삭제 시 카운터
        } else if (n === -1) {
          const min = minHeap.extractMin();
          if (min !== null) countMap.set(min, (countMap.get(min) || 0) - 1); // 최솟값 삭제 시 카운터
        }

        while (!maxHeap.isEmpty() && (countMap.get(maxHeap.peek()) || 0) <= 0) {
          maxHeap.extractMax();
        }
        while (!minHeap.isEmpty() && (countMap.get(minHeap.peek()) || 0) <= 0) {
          minHeap.extractMin();
        }
      }
    }

    if (maxHeap.isEmpty()) {
      answer += "EMPTY\n";
    } else {
      answer += `${maxHeap.peek()} ${minHeap.peek()}\n`;
    }

    index += k + 1; // 다음 테스트 케이스로 이동
  }

  console.log(answer);
});
