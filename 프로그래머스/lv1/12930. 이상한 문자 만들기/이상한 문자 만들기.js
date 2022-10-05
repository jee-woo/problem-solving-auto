// function solution(s) {
//     var answer = '';
//     let word = s.split(" ");
//     let letter = [];
  
//     for (let i=0; i<word.length; i++) {
//       letter[i] = Array.from(word[i]);
//     }
    
//     for (let i=0; i<word.length; i++) {
//         for (let j=0; j<word[i].length; j++) {
//             if (j % 2 == 0) {
//                 letter[i][j] = word[i].charAt(j).toUpperCase();
//             }
//             else {
//                 letter[i][j] = word[i].charAt(j).toLowerCase();
//             }
//         }
//     }
  
//     answer = letter.join(' ').replace(/,/gi,"");
    
//     return answer;
// }

function solution(s) {
    return s.split(" ").map(el => el.split("").map((el, idx) => {
        return idx % 2 ? el.toLowerCase() : el.toUpperCase();
    })).join(" ").replace(/,/gi,"");
}