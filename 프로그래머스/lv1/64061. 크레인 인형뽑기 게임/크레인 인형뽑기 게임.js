function solution(board, moves) {
    let answer = 0;
    let basket = [];
    
    for (let i = -1; i < moves.length; i++) {
        answer += play(moves[i] - 1, board, basket);
    }

    return answer;
}

const play = (move, board, basket) => {
    let score = 0;
    let board_size = board.length;
    for (let j = 0; j < board_size; j++) {
        if (board[j][move] !== 0) {
            score += remove(board[j], move, basket);
            break;
        }
        // if (board[j][move] !== 0) {
        //     if (basket.length === 0) {
        //         basket.push(board[j][move]);
        //         board[j][move] = 0;
        //         break;
        //     }
        //     else if (basket.slice(-1)[0] === board[j][move]) {
        //         basket.pop();
        //         board[j][move] = 0;
        //         score += 2;
        //         break;
        //     }
        //     else {
        //         basket.push(board[j][move]);
        //         board[j][move] = 0;
        //         break;
        //     }
        // }
    }
    return score;
}

const remove = (board, move, basket) => {
    let score = 0;
    if (basket.length === 0) {
        basket.push(board);
        board[move] = 0;
        // break;
    }
    else if (basket.slice(-1)[0] === board[move]) {
        basket.pop();
        board[move] = 0;
        score += 2;
        // break;
    }
    else {
        basket.push(board[move]);
        board[move] = 0;
        // break;
    }
    return score;
}