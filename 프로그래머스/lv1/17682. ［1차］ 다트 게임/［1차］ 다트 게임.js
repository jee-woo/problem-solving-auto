// // case 정규식 참고
// var regex1 = /a/,
//     regex2 = /b/,
//     regex3 = /c/,
//     samplestring = 'b';

// switch (true) {
//     case regex1.test(samplestring):
//         console.log("regex1");
//         break;
//     case regex2.test(samplestring):
//         console.log("regex2");
//         break;
//     case regex3.test(samplestring):
//         console.log("regex3");
//         break;
// }


function solution(dartResult) {
    // 문자열 입력
    // case문으로 점수, 보너스, 옵션 나누기
    // 점수 두자리수일 경우 처리
    let score = [];
    let power, option;
    for (let i = 0; i < dartResult.length; i++) {
        
        power = "", option = "";
        switch(true) {
            case /[0-9]/.test(dartResult[i]):
                if (+dartResult[i+1] === 0) {
                    score.push(+(dartResult[i] + "0"));
                    i++;
                } else {
                    score.push(dartResult[i]);
                }
                break;
            case /[SDT]/.test(dartResult[i]):
                if (dartResult[i] === "D")
                    score[score.length - 1] = Math.pow(score[score.length - 1], 2);
                else if (dartResult[i] === "T")
                    score[score.length - 1] = Math.pow(score[score.length - 1], 3);
                break;
            case /[*#]/.test(dartResult[i]):
                if (dartResult[i] === "*") {
                    score[score.length - 1] *= 2;
                    if (score.length > 1);
                        score[score.length - 2] *= 2;
                }
                else if (dartResult[i] === "#")
                    score[score.length - 1] *= -1;
                break;
        }
        // console.log(score.map(Number))//
    }
        return score.map(Number).reduce((acc, cur) => acc + cur, 0);
}