def solution(board):
    n = len(board)
    m = len(board[0])
    
    for i in range(n):
        for j in range(m):
            if board[i][j] == 0: continue
            if i > 0 and j > 0:
                board[i][j] = min(board[i-1][j], board[i][j-1], board[i-1][j-1]) + 1
                
    return max(max(row) for row in board) ** 2


"""
1*1 -> 2*2 -> 3*3

1을 찾으면 2*2로 검사
2*2 통과하면 3*3 검사
...

열 검사하면서 1 아닌 곳으로 j 이동

누적합?

"""