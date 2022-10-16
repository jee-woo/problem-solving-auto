function solution(answers) { // answers = [1,2,3,4,5]
    let supos = [[1, 2, 3, 4, 5],
                 [2, 1, 2, 3, 2, 4, 2, 5],
                 [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]];
    let scores = [0, 0, 0];
    let bestScore = [];
    
    for (let i = 0; i < answers.length; i++) {
        if (supos[0][i % supos[0].length] === answers[i]) scores[0]++;
        if (supos[1][i % supos[1].length] === answers[i]) scores[1]++;
        if (supos[2][i % supos[2].length] === answers[i]) scores[2]++;
    }
    
    let max = Math.max(...scores);
    
    for (let i = 0; i < scores.length; i++)
        if (scores[i] === max) bestScore.push(i + 1);
    
    return bestScore;
}