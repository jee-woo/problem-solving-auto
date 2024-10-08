// 2024.10.08

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [A, B, C] = input[0].split(' ').map(BigInt);

const memo = {};

const dc = (n, exp) => {
  if (exp === 0n) return 1;
  if (exp === 1n) return n;

  if (memo[exp]) return memo[exp];
  const mid = exp / 2n;
  let a = BigInt(dc(n, mid));
  let b = exp % 2n ? dc(n, mid + 1n) : a;
  memo[mid] = a;
  if (a !== b) memo[mid + 1n] = b;

  return BigInt(a % C) * BigInt(b % C);
};

const result = dc(A, B);
// console.table(memo);

console.log(Number(result % C));
