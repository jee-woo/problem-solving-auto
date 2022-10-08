function solution(s) {
    let answer = s;
    let nums = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    let regExp;
    
    for (let i = 0; i < nums.length; i++) {
        regExp = new RegExp(`${nums[i]}`, 'g');
        answer = answer.replace(regExp, i);
    }
    
    return +answer;
}