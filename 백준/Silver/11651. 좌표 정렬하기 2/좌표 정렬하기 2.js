const fs = require("fs"); // fs 모듈 선언
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n"); // 입력 값 가져오기 + 데이터 정제
let [count, ...nums] = input;

nums = nums.map((el) => el.split(" ").map(Number));

nums.sort((a, b) => {
  if (a[1] === b[1]) return a[0] - b[0];
  return a[1] - b[1];
});

console.log(nums.map((el) => el.join(" ")).join("\n"));