// 2025.02.26

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M, K] = input[0].split(' ').map(Number);
const nums = input.slice(1, N + 1).map(BigInt);
const commands = input.slice(N + 1).map((v) => {
  let n = v.split(' ');
  if (n[0] === '1') return [Number(n[0]), Number(n[1]), BigInt(n[2])];
  else return [Number(n[0]), Number(n[1]), Number(n[2])];
});

// console.log(commands);

// let jisu = Math.ceil(Math.sqrt(N));
// const size = Math.pow(2, jisu);
let size = 1;
while (size < N) {
  size *= 2;
}
const tree = new Array(size * 2).fill(BigInt(0));

// console.log(size);

const construct = () => {
  // leaf 초기화
  for (let i = size, j = 0; i < size + N; i++, j++) {
    tree[i] = nums[j];
  }

  // 구간합 트리 형성
  for (let i = size - 1; i >= 1; i--) {
    tree[i] = tree[i * 2] + tree[i * 2 + 1];
  }

  // console.table(tree);
};

const update = (idx, val) => {
  let treeIdx = idx + size;
  tree[treeIdx] = val;

  while (treeIdx > 1) {
    treeIdx = Math.floor(treeIdx / 2);
    tree[treeIdx] = tree[treeIdx * 2] + tree[treeIdx * 2 + 1];
  }
};

// l, r: 구하려는 범위
// nl, nr: 현재 범위
// nn: node number
const sum = (l, r, nl, nr, nn) => {
  if (nl > r || nr < l) return BigInt(0);
  if (l <= nl && nr <= r) return tree[nn];
  let mid = Math.floor((nl + nr) / 2);
  return sum(l, r, nl, mid, nn * 2) + sum(l, r, mid + 1, nr, nn * 2 + 1);
};

const solution = () => {
  // 트리 초기화
  construct();

  let answer = '';
  for (let [a, b, c] of commands) {
    if (a === 1) {
      update(b - 1, c);
    } else {
      answer = answer + sum(b - 1, c - 1, 0, size - 1, 1) + '\n';
    }
  }

  console.log(answer);
};

solution();
