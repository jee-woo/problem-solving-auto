const fs = require("fs"); // fs 모듈 선언
const input = fs.readFileSync("/dev/stdin").toString().trim(); // 입력 값 가져오기 + 데이터 정제

console.log(input.split("").sort((a, b) => b - a).join(""))