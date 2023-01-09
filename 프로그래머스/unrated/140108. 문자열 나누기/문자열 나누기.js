function solution(s) {
    let result = 0;
    let x, xCount, yCount;
    
    for (let i = 0; i < s.length; i++) {
        if (xCount === yCount) {
            x = s[i];
            xCount = 0;
            yCount = 0;
            result++;
        }
        if (s[i] === x) xCount++;
        else yCount++;
    }
    
    return result;
}