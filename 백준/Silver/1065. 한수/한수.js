const fs = require("fs");
const input = Number(fs.readFileSync("/dev/stdin").toString().trim());

let str,
  han,
  diff1,
  diff2,
  count = 0;
for (let i = 1; i <= input; i++) {
  str = i + "";
  (diff1 = -1), (diff2 = -1);
  han = true;
  for (let j = 1; j < str.length - 1; j++) {
    diff1 = +str[j] - +str[j - 1];
    diff2 = +str[j + 1] - +str[j];
    if (diff1 !== diff2) {
      han = false;
      break;
    }
  }
  if (han) count++;
}

console.log(count);
