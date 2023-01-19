// n * n 2차열 배열 만들기
// 1행 1열 ~ i행 i열까지 빈칸 i로 채우기
// 1차원 배열로 만들기
// arr = arr.slice(left, right + 1)

//    0  1  2
// 0[[1, 2, 3],
// 1 [2, 2, 3],
// 2 [3, 3, 3]]

// 0, 1, 2, 3, 4, 5, 6, 7, 8
// 1, 2, 3, 2, 2, 3, 3, 3, 3

// 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15
// 1, 2, 3, 4, 2, 2, 3, 4, 3, 3, 3, 4, 4, 4, 4, 4

function solution(n, left, right) {
    const result = [];
    
    let start = Math.floor(left / n);
    let end = Math.floor(right / n);
    
    let leftSlice = left % n;
    let rightSlice = n - (right % n) - 1;
    
    // console.log(leftSlice, rightSlice)
    
    for (let i = start; i <= end; i++) {
        for (let j = 0; j < n; j++) {
            result.push(Math.max(i + 1, j + 1));
        }
    }
    return result.slice(leftSlice, result.length - rightSlice);
}