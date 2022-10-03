const fs = require("fs"); // fs 모듈 선언
const input = fs.readFileSync("/dev/stdin").toString().trim(); // 입력 값 가져오기 + 데이터 정제

let count = 0;
for (let i = 0; i < input.length; i++) {
  count++;
  switch (true) {
    case /[csz]/.test(input[i]):
      if (input[i + 1] === "=" || input[i + 1] === "-") i++;
      break;
    case /[ln]/.test(input[i]):
      if (input[i + 1] === "j") i++;
      break;
    case /[d]/.test(input[i]):
      if (input[i + 1] === "-") i++;
      else if (input[i + 1] === "z" && input[i + 2] === "=") i += 2;
      break;
  }
}
console.log(count);
