const fs = require("fs"); // fs 모듈 선언
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n").map(Number); // 입력 값 가져오기 + 데이터 정제

let nums = input.slice(1).sort((a, b) => a - b);
let mode; // 최빈값
let count = {};
for (let i = 0; i < nums.length; i++) {
  if (count[nums[i]]) count[nums[i]]++;
  else count[nums[i]] = 1;
}
let maxCount = Math.max(...Object.values(count));
let maxNums = [];
for (let el in count) if (count[el] === maxCount) maxNums.push(el);

if (maxNums.length > 1) mode = maxNums.sort((a, b) => a - b)[1];
else mode = maxNums[0];

let mean = (nums.reduce((acc, cur) => acc + cur) / nums.length).toFixed(0);
if (mean === "-0") mean = -mean;
console.log(mean); // 산술평균
console.log(nums[parseInt(nums.length / 2)]); // 중앙값
console.log(mode); // 최빈값
console.log(nums[nums.length - 1] - nums[0]); // 범위