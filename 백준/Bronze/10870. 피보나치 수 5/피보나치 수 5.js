const fs = require("fs"); // fs 모듈 선언
const input = fs.readFileSync("/dev/stdin").toString(); // 입력 값 가져오기 + 데이터 정제

function fibonacci(n) {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(+input));
