function solution(brown, yellow) {
    let rowCol = brown / 2 - 2;
    let row = rowCol - 1, col = 1;
    
    while (true) {
        if (row * col === yellow) return [row + 2, col + 2];
        row--, col++;
    }
    
    return;
}

// brown의 24 / 2 - 2 === 10으로 노랑의 가로 세로를 정하면

// 9 1
// 8 2
// 7 3
// 6 4 === 24 (yellow 당첨) -> return [6+2, 4+2]
// 5 5