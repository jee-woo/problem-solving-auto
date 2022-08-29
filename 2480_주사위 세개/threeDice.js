const fs = require("fs"); // fs 모듈 선언
const test = fs.readFileSync("/dev/stdin").toString().split(" ").map(Number); // 입력 값 가져오기 + 데이터 정제

let answer;

if (test[0] === test[1] && test[1] === test[2]) {
  answer = 10000 + test[0] * 1000;
} else if (test[0] === test[1] || test[0] === test[2]) {
  answer = 1000 + test[0] * 100;
} else if (test[1] === test[2]) {
  answer = 1000 + test[1] * 100;
} else {
  answer = Math.max(...test) * 100;
}

console.log(answer);
