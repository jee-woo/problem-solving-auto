// 2025.01.30

const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'input.txt');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [M, N] = input[0].split(' ').map(Number);
const numLists = input.slice(1).map((v) => v.split(' ').map(Number));
const map = new Map();

const getMyPos = (num, sorted) => {
  let l = 0;
  let r = N;

  let mid;

  while (l <= r) {
    mid = Math.floor((l + r) / 2);
    if (num === sorted[mid]) return mid;
    if (num < sorted[mid]) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }

  return mid;
};

const getSeq = (nums) => {
  const sorted = nums.slice().sort((a, b) => a - b);
  const seq = nums.map((n) => getMyPos(n, sorted)).join(' ');
  return seq;
};

let answer = 0;
const seqs = [];

for (let nums of numLists) {
  const seq = getSeq(nums);
  // const count = map.get(seq);
  seqs.push(seq);

  // if (count) {
  //   map.set(seq, count + 1);
  //   answer += count;
  // } else {
  //   map.set(seq, 1);
  // }
}

for (let i = 0; i < M - 1; ++i) {
  for (let j = i + 1; j < M; ++j) {
    if (seqs[i] === seqs[j]) answer++;
  }
}

console.log(answer);
