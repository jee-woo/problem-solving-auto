function solution(places) {
    let answer = [];
    // console.table(places)
    const isGood = (r, c, place) => {
        // console.log('r, c:', r, c)
        for (let i = r - 2; i <= r + 2; i++) {
            for (let j = c - 2; j <= c + 2; j++) {
                if (i === r && j === c) continue;
                if (i < 0 || j < 0 || i >= 5 || j >= 5) continue;
                if (Math.abs(i - r) + Math.abs(j - c) > 2) continue;
                if (place[i][j] === 'O' || place[i][j] === 'X') continue;
                
                // P인 경우
                // 거리가 1인 경우
                if (Math.abs(i - r) + Math.abs(j - c) === 1) {
                    // console.log('distance 1')
                    return false;
                }
                // 거리가 2인 경우
                // console.log(r, c, i, j)
                
                // 왼쪽 위
                if (r - i === 1 && c - j === 1) {
                // console.log('1111111')
                    
                    if (place[i + 1][j] === 'X' && place[i][j + 1] === 'X') continue;
                }
                
                // 오른쪽 위
                else if (r - i === 1 && c - j === -1) {
                // console.log('222222')
                    
                    if (place[i + 1][j] === 'X' && place[i][j - 1] === 'X') continue;
                }
                
                // 왼쪽 아래
                else if (r - i === -1 && c - j === 1) {
                // console.log('333333')
                    
                    if (place[i - 1][j] === 'X' && place[i][j + 1] === 'X') continue;
                }
                
                // 오른쪽 아래
                else if (r - i === -1 && c - j === -1) {
                // console.log('444444')
                    
                    if (place[i - 1][j] === 'X' && place[i][j - 1] === 'X') continue;
                }
                
                // 위인 경우
                else if (r - i === 2 && c === j) {
                // console.log('555555')
                    
                    if (place[i + 1][j] === 'X') continue;
                }
                
                // 아래인 경우
                else if (r - i === -2 && c === j) {
                    if (place[i - 1][j] === 'X') continue;
                }
                
                // 왼쪽인 경우
                else if (r === i && c - j === 2) {
                    if (place[i][j + 1] === 'X') continue;
                }
                
                // 오른쪽인 경우
                else if (r === i && c - j === -2) {
                    if (place[i][j - 1] === 'X') continue;
                } 
                // else {
                    return false;
                // }
            }
        }
        return true;
    }
    const check = (place) => {
        // console.table(place)
        let res;
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (place[i][j] === 'X') continue; // 파티션
                if (place[i][j] === 'O') continue; // 빈 테이블
                // P일 경우
                // 맨해튼거리 2 이하인 경우 return 0
                res = isGood(i, j, place)
                if (!res) {
                    // console.log('res', i, j, res)
                    return 0;
                }
            }
        }
        
        return 1;
    }
    for (let place of places) {
        answer.push(check(place.map(v => v.split(''))))
    }
    return answer;
}