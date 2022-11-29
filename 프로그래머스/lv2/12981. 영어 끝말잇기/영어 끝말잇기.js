function solution(n, words) {
    let already = new Set();
    let prevSize, nowSize;
    let num, turn;
    
    for (let i = 0; i < words.length; i++) {
        prevSize = already.size;
        already.add(words[i]);
        nowSize = already.size;
        
        // 탈락
        if ((i > 0 && words[i-1].slice(-1)[0] !== words[i][0]) || words[i].length <= 1 || prevSize === nowSize) {
            num = i % n + 1;
            turn = parseInt(i / n) + 1;
            return [num, turn];
        }
    }
    
    return [0, 0];
}