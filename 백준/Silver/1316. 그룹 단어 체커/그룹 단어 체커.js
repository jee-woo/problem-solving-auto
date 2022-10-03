const fs = require("fs"); // fs 모듈 선언
const input = fs.readFileSync("/dev/stdin").toString().split("\n"); // 입력 값 가져오기 + 데이터 정제

let letters,
  count = 0,
  isGroup;

for (let i = 1; i <= +input[0]; i++) {
  isGroup = true;
  letters = {};
  for (let j = 0; j < input[i].length; j++) {
    if (letters[input[i][j]] === undefined) {
      letters[input[i][j]] = true;
    } else if (letters[input[i][j]] && input[i][j - 1] !== input[i][j]) {
      isGroup = false;
      break;
    }
  }
  if (isGroup) count++;
}

console.log(count);