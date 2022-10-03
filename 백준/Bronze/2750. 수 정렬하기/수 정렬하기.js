const fs = require("fs"); // fs 모듈 선언
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n").map(Number); // 입력 값 가져오기 + 데이터 정제
let temp;
let newInput = input.slice(1);
let sorted;
// bubble sort
while (true) {
  for (let i = 0; i < newInput.length - 1; i++) {
    if (newInput[i] > newInput[i+1]) {
      temp = newInput[i];
      newInput[i] = newInput[i+1];
      newInput[i+1] = temp;
    }
  }
  sorted = true;
  for (let i = 0; i < newInput.length; i++) {
    if (newInput[i] > newInput[i+1]) {
      sorted = false;
      break;
    }
  }
  if (sorted) break;
}

console.log(newInput.join("\n").trim());