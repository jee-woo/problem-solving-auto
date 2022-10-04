const fs = require("fs"); // fs 모듈 선언
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n"); // 입력 값 가져오기 + 데이터 정제

let [length, ...words] = input;
words.sort().sort((a, b) => a.length - b.length);

for (let i = 0; i < length; i++) {
  if (words[i] === words[i + 1]) continue;
  console.log(words[i]);
}