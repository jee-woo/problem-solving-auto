// 2025.02.14

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);

const foods = input
  .slice(1, N + 1)
  .map((v) => {
    const arr = v.split(' ');
    const count = Number(arr.shift());
    return [count, arr.join(' ')];
  })
  .sort((a, b) => {
    if (a[1] > b[1]) return 1;
    else return -1;
  });

let prev = [];
let foodArr;
let flag;

for (let [k, foodStr] of foods) {
  foodArr = foodStr.split(' ');
  flag = true;

  for (let i = 0; i < foodArr.length; i++) {
    if (flag && prev.length > i && prev[i] === foodArr[i]) continue;
    console.log(`${'-'.repeat(i * 2)}${foodArr[i]}`);
    flag = false;
  }

  prev = foodArr;
}
