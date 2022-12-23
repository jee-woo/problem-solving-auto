function solution(board, moves) {
    let answer = 0;
    let basket = [];
    
    for (let i = 0; i < moves.length; i++) {
        answer += play(moves[i] - 1, board, basket);
        // console.log(basket)
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
    }
    return score;
}

const remove = (boardRow, move, basket) => {
    // console.log(boardRow)
    let score = 0;
    if (basket.length === 0) {
        // basket.push(boardRow);
        basket.push(boardRow[move])
    }
    else if (basket.slice(-1)[0] === boardRow[move]) {
        basket.pop();
        score += 2;
    }
    else {
        basket.push(boardRow[move]);
    }
    boardRow[move] = 0;
    return score;
}