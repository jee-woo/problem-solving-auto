function solution(n, arr1, arr2) {
    // 십진수 => 이진수 => 문자열(0 / 1) => 문자열(#) 변환
    // 십진수.toString(2)
    // 출력 전 #으로 된 배열 합치기
    
    let arr = [];
    let binary1 = [], binary2 = [], binaryMix = [], sharp = [];
    
    for (let i = 0; i < n; i++) {
        binary1.push(arr1[i].toString(2).padStart(n, '0').split(""));
        binary2.push(arr2[i].toString(2).padStart(n, '0').split(""));
        binaryMix.push(binary1[i].slice());
        for (let j = 0; j < n; j++) {
            if (+binary1[i][j] === 1 || +binary2[i][j] === 1) binaryMix[i][j] = "#";
            else binaryMix[i][j] = " "
        }
        sharp.push(binaryMix[i].join(""))
    }
    
    return sharp;
}