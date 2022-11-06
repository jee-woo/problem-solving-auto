function solution(s){
    // if (s[0] === ")") return false;
    // if (s.slice(-1) === "(") return false;
    // if (s.split("(").length - 1 !== s.split(")").length - 1) return false;
    
    let left = 0, right = 0;
    let length = s.length;
    for (let i = 0; i < length; i++) {
        s[i] === "(" ? left++ : right++;
        if (left < right) return false;
    }
    
    return left === right ? true : false;
    
//     let lr = 0;
    
//     for (let i = 0; i < s.length; i++) {
//         if (s[i] === "(") lr++;
//         else {
//             lr--;
//         }
//         if (lr < 0) return false;
//     }
    
//     return lr === 0 ? true : false;
}