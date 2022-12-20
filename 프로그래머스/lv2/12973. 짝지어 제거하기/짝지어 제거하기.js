function solution(s)
{
    let left = [];
    let right = s.split("");
    let rightIdx = 0;
    let sLength = s.length;
    
    for (let i = 0; i < sLength; i++) {
        if (left.at(-1) === right[rightIdx]) {
            left.pop();
        } else {
            left.push(right[rightIdx]);
        }
        rightIdx++;
    }
    
    if (left.length > 0) return 0;
    else return 1;
}