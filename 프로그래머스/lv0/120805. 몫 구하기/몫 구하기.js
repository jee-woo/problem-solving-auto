function solution(num1, num2) {
    // 몫을 구하는 연산자를 사용
    // 자바스크립트에서는 바로 구하면 안된다 -> 형 변환
    
    let quotient = Math.floor(num1 / num2);
    
    return quotient;
}