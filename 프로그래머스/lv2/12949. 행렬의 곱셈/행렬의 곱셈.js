function solution(arr1, arr2) {
    const product = [];
    
    const m = arr1.length, k = arr1[0].length, n = arr2[0].length;
    
    for (let i = 0; i < m; i++) {
        product.push([]);
        for (let j = 0; j < k; j++) {
            // product[i].push([]);
            for (let l = 0; l < n; l++) {
                if (product[i][l] === undefined) product[i][l] = 0;
                // console.log(product[i][l], arr1[i][j], arr2[j][l])
                product[i][l] += (arr1[i][j] * arr2[j][l]);
                // console.log(product)
            }
        }
    }
    
    return product;
}

[[2, 3, 2], 
 [4, 2, 4], 
 [3, 1, 4]]

[[5, 4, 3], 
 [2, 4, 1], 
 [3, 1, 1]]