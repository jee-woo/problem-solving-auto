// 2025.02.26

const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const nums = input.slice(1, 1 + N).map(Number);
const ranges = input.slice(1 + N).map((v) => v.split(' ').map(Number));

let size = 1;
while (size < N) {
  size *= 2;
}
// console.log(size);
const maxTree = new Array(size * 2).fill(0);
const minTree = new Array(size * 2).fill(Number.MAX_SAFE_INTEGER);

const construct = () => {
  // leaf 초기화
  for (let i = size, j = 0; j < N; i++, j++) {
    maxTree[i] = nums[j];
    minTree[i] = nums[j];
  }

  // 구간합 계산
  for (let i = size - 1; i >= 1; i--) {
    maxTree[i] = Math.max(maxTree[i * 2], maxTree[i * 2 + 1]);
    minTree[i] = Math.min(minTree[i * 2], minTree[i * 2 + 1]);
  }

  // console.table(maxTree);
  // console.table(minTree);
};

const getMin = (l, r, nl, nr, nn) => {
  if (nl > r || nr < l) return Number.MAX_SAFE_INTEGER;
  if (l <= nl && nr <= r) return minTree[nn];
  let mid = Math.floor((nl + nr) / 2);
  return Math.min(
    getMin(l, r, nl, mid, nn * 2),
    getMin(l, r, mid + 1, nr, nn * 2 + 1)
  );
};

const getMax = (l, r, nl, nr, nn) => {
  if (nl > r || nr < l) return 0;
  if (l <= nl && nr <= r) return maxTree[nn];
  let mid = Math.floor((nl + nr) / 2);
  return Math.max(
    getMax(l, r, nl, mid, nn * 2),
    getMax(l, r, mid + 1, nr, nn * 2 + 1)
  );
};

const solution = () => {
  construct();

  let answer = '';
  for (let [a, b] of ranges) {
    answer += `${getMin(a - 1, b - 1, 0, size - 1, 1)} ${getMax(
      a - 1,
      b - 1,
      0,
      size - 1,
      1
    )}\n`;
  }

  console.log(answer);
};

solution();
