const fs = require("fs"); // fs 모듈 선언
const input = fs.readFileSync("/dev/stdin").toString(); // 입력 값 가져오기 + 데이터 정제

function factorial(n) {
	if(n <= 1) {
		return 1;
	}
	return n * factorial(n - 1);
}

console.log(factorial(+input));