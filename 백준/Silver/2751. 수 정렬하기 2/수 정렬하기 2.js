const fs = require("fs"); // fs 모듈 선언
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n").map(Number); // 입력 값 가져오기 + 데이터 정제
let nums = input.slice(1);

// Counting Sort (계수 정렬)
let result = nums.sort((a, b) => a - b);

console.log(result.join("\n"));
