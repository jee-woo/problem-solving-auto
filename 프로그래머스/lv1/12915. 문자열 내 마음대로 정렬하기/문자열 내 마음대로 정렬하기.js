// function solution(strings, n) {
//   var answer = [];
  
//   let temp;
  
//   //console.log(strings);
  
//   strings.sort();
  
//   for (let i=0; i<strings.length; i++) {
//     for (let j=0; j<strings.length-i-1; j++) {
//       if(strings[j].charAt(n).charCodeAt(0) > strings[j+1].charAt(n).charCodeAt(0)){
//         temp = strings[j];
//         strings[j] = strings[j+1];
//         strings[j+1] = temp;
        
//         //console.log(strings);
//       }
//     }
//   }
  
//   answer = strings;
  
//   return answer;
// }

function solution(strings, n) {
    return strings.sort().sort((a, b) => a.charCodeAt(n) - b.charCodeAt(n));
}