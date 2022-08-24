const fs = require("fs"); // fs 모듈 선언
const input = fs.readFileSync("/dev/stdin").toString().split("\n").map(Number); // 입력 값 가져오기 + 데이터 정제

let num1 = input[0],
  num2 = String(input[1]);
let answer = [];

for (let i = 2; i >= 0; i--) answer.push(num1 * Number(num2[i]));

for (let i = 0; i < answer.length; i++) console.log(answer[i]);
console.log(num1 * Number(num2));
