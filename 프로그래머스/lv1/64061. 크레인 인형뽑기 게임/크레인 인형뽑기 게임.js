function solution(board, moves) {
    let answer = 0;
    let basket = [];
    let board_size = board.length;

    for (let i = 0; i < moves.length; i++) {
        for (let j = 0; j < board_size; j++) {
            if (board[j][moves[i] - 1] === 0) {
            }
            else {
                if (basket.length === 0) {
                    basket.push(board[j][moves[i] - 1]);
                    board[j][moves[i] - 1] = 0;
                    break;
                }
                else if (basket.slice(-1)[0] == board[j][moves[i] - 1]) {
                    basket.pop();
                    board[j][moves[i] - 1] = 0;
                    answer += 2;
                    break;
                }
                else {
                    basket.push(board[j][moves[i] - 1]);
                    board[j][moves[i] - 1] = 0;
                    break;
                }
            }
        }
    }


    return answer;
}