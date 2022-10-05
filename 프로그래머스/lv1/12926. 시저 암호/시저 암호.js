// function solution(s, n) {
//     var answer = '';
    
//     //65-90 A-Z, 97-122 a-z
    
//     let letter = s.split('');
//     let asciiLetter = 0;
  
//     for (let i=0; i<letter.length; i++) {
//       asciiLetter = s.charCodeAt(i);
//       if (asciiLetter === " ") {
//         continue;
//       }
//       else if (asciiLetter >= 65 && asciiLetter <= 90) {
//         if (asciiLetter + n > 90) {
//           letter[i] = String.fromCharCode(asciiLetter + n - 26);
//         }
//         else {
//           letter[i] = String.fromCharCode(asciiLetter + n);
//         }
//       }
//       else if (asciiLetter >= 97 && asciiLetter <= 122) {
//         if (asciiLetter + n > 122) {
//           letter[i] = String.fromCharCode(asciiLetter + n - 26);
//         }
//         else {
//           letter[i] = String.fromCharCode(asciiLetter + n);
//         }
//       }
//       else {
//         continue;
//       }
//     }
  
//     answer = letter.join('');

//     return answer;
// }






//65-90 A-Z, 97-122 a-z
function shift(c, n) {
    // console.log(c.charCodeAt())
    if (c === " ") return c;
    let ascii = c.charCodeAt();
    c = ascii <= 90 ? String.fromCharCode((ascii + n - 65) % 26 + 65) : String.fromCharCode((ascii + n - 97) % 26 + 97);
    return c;
}

function solution(s, n) {
    return s.split("").map(el => shift(el, n)).join("");
}