const fs = require("fs");
const s = fs.readFileSync("/dev/stdin").toString().trim();

let stack = 0;
let sticks = 0;

for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") stack++;
    else if (s[i] === ")" && s[i - 1] === "(") {
        stack--; // 마지막 '('은 레이저이니 제거
        sticks += stack;
    } else {
        stack--;
        sticks++;
    }
}

console.log(sticks);