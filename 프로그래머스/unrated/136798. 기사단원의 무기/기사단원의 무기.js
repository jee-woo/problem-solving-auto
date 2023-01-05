function solution(number, limit, power) {
    let weights = 0;
    let divisor;
    
    for (let i = 1; i <= number; i++) {
        divisor = getDivisor(i);
        if (divisor > limit) {
            weights += power;
        } else {
            weights += divisor;
        }
    }
    
    return weights;
}

const getDivisor = (num) => {
    let divisor = 0;

    for (let i = 1; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            divisor++;
            if(num / i !== i) divisor++;
        }
    }
    
    return divisor;
}

// number:  1 ~ number까지의 약수 개수 -> [1, 2, ..., number의 약수 개수]
// limit:   공격력 제한수치
// power:   제한수치를 초과한 기사가 사용할 무기의 공격력

// 1. 약수의 개수 구하는 함수
