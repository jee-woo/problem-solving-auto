function solution(s) {
    let proper = 0;
    let rotatedS = s.split("");
    
    for (let i = 0; i < s.length; i++) {
        if (isProper(rotatedS)) proper++;
        rotatedS = rotate(rotatedS);
    }
    
    return proper;
}

const rotate = (str) => {
    const first = str.shift();
    str.push(first)
    return str;
}

const isProper = (str) => {
    let stack = [];
    
    for (let i = 0; i < str.length; i++) {
        if (str[i] === "(" || str[i] === "{" || str[i] === "[") {
            stack.push(str[i]);
        } else if (str[i] === ")") {
            if (stack.at(-1) === "(") stack.pop();
            else return false;
        } else if (str[i] === "}") {
            if (stack.at(-1) === "{") stack.pop();
            else return false;
        } else if (str[i] === "]") {
            if (stack.at(-1) === "[") stack.pop();
            else return false;
        }
    }
    if (stack.length !== 0) return false;
    return true;
}

// const isProper = (str) => {
//     let small = 0, medium = 0, big = 0;
    
//     for (let i = 0; i < str.length; i++) {
//         if (str[i] === "(") small++;
//         else if (str[i] === ")") {
//             small--;
//         }
//         else if (str[i] === "{") medium++;
//         else if (str[i] === "}") {
//             medium--;
//         }
//         else if (str[i] === "[") big++;
//         else if (str[i] === "]") {
//             big--;
//         }
        
//         if (small < 0 || medium < 0 || big < 0) return false;
//     }
    
//     if (small !== 0 || medium !== 0 || big !== 0) return false;
//     else return true;
// }
