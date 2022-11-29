function solution(food) {
    let table = '';
    let foodCount;
    
    for (let i = 1; i < food.length; i++) {
        foodCount = parseInt(food[i] / 2);
        if (foodCount < 0) continue;
        table += String(i).repeat(foodCount);
    }
    table += '0' + table.split('').reverse().join('');
    
    return table;
}