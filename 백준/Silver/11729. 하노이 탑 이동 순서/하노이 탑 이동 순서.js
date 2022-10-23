// 해설 봄
const fs = require("fs"); // fs 모듈 선언
const input = Number(fs.readFileSync("/dev/stdin").toString()); // 입력 값 가져오기 + 데이터 정제

let result = "";

function hanoi(num, from, to, other) {
  if (num === 0) {
    return;
  }
  hanoi(num - 1, from, other, to);
  result += `${from} ${to}\n`;
  hanoi(num - 1, other, to, from);
}

console.log(Math.pow(2, input) - 1);
hanoi(input, 1, 3, 2);
console.log(result);
