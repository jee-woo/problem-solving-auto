const fs = require("fs"); // fs 모듈 선언
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n"); // 입력 값 가져오기 + 데이터 정제

let [length, ...list] = input;
list = list.map((el) => el.split(" "));

list.sort((a, b) => a[0] - b[0]);
console.log(list.map((el) => el.join(" ")).join("\n"));
