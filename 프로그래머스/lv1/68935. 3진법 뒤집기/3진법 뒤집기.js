// function solution(n) {
//     let three = ""
//     while (true) {
//         three += n % 3;
//         n = parseInt(n / 3);
//         if (n === 1) {
//             three += "1";
//             break;
//         } else if (n < 1) break;
//     }
    
//     let decimal = 0;
//     for (let i = 0; i < three.length; i++) {
//         decimal += three[i] * Math.pow(3, three.length - 1 - i)
//     }
    
//     return decimal;
// }

function solution(n) {
    return parseInt(n.toString(3).split("").reverse().join(""), 3);
}