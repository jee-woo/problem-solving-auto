function solution(arr1, arr2) {
    const product = [];
    
    const m = arr1.length, k = arr1[0].length, n = arr2[0].length;
    
    for (let i = 0; i < m; i++) {
        product.push([]);
        for (let j = 0; j < k; j++) {
            for (let l = 0; l < n; l++) {
                if (product[i][l] === undefined) product[i][l] = 0;
                product[i][l] += (arr1[i][j] * arr2[j][l]);
            }
        }
    }
    
    return product;
}