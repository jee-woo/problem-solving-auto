function getDistance(pos, number) {
    let distance = 0, x, y;

    if (number===0) {
        number = 11;
    }
    if (pos === 0) {
        pos = 11;
    }
    // x와 y 초기화
    if (number % 3 === 0) {
        x = Math.floor(number / 3);
        y = 3;
    }
    else {
        x = Math.floor(number / 3) + 1;
        y = number % 3;
    }
    // distance 구하기
    if (pos % 3 === 0) {
        distance += Math.abs(x - (Math.floor(pos / 3)));
        distance += Math.abs(y - 3);
    }
    else {
        distance += Math.abs(x - (Math.floor(pos / 3) + 1));
        distance += Math.abs(y - (pos % 3));
    }

    return distance;
}

function solution(numbers, hand) {
    let answer = "";

    let left_distance, right_distance;
    let left_pos = 10, right_pos = 12;

    for (let i=0; i<numbers.length; i++) {
        switch(numbers[i]) {
            case 1: case 4: case 7:
                answer += "L";
                left_pos = numbers[i];
                break;
            case 3: case 6: case 9:
                answer += "R";
                right_pos = numbers[i];
                break;
            case 2: case 5: case 8: case 0:
                left_distance = getDistance(left_pos, numbers[i]);
                right_distance = getDistance(right_pos, numbers[i]);

                if (left_distance === right_distance) {
                    if (hand ==="left") {
                        answer += "L";
                        left_pos = numbers[i];
                    }
                    else {
                        answer += "R";
                        right_pos = numbers[i];
                    }
                }
                else if (left_distance < right_distance) {
                    answer += "L";
                    left_pos = numbers[i];
                }
                else {
                    answer += "R";
                    right_pos = numbers[i];
                }
                break;
        }
    }

    return answer;
}
