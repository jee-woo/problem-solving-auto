def solution(board):
    # 1. 개수 판단
    os = 0
    xs = 0
    for i in range(3):
        for j in range(3):
            if board[i][j] == 'O': os += 1
            elif board[i][j] == 'X': xs += 1
    # print('os', os, 'xs', xs)
    if xs > os: return 0
    if os - xs >= 2: return 0
    
    # 2. 빙고 판단
    o_bingo = False
    x_bingo = False
    
    # 가로
    for i in range(3):
        row = "".join(board[i])
        if row == "OOO":
            o_bingo = True
        elif row == 'XXX':
            x_bingo = True
    if o_bingo and x_bingo: return 0
    
    # 세로
    for j in range(3):
        col = ''
        for i in range(3):
            col += board[i][j]
        if col == "OOO":
            o_bingo = True
        elif col == 'XXX':
            x_bingo = True
    if o_bingo and x_bingo: return 0

    # 왼대각
    if board[0][0] == 'O' and board[1][1] == 'O' and board[2][2] == 'O':
        o_bingo = True
    if board[0][0] == 'X' and board[1][1] == 'X' and board[2][2] == 'X':
        x_bingo = True
    # if o_bingo and x_bingo: return 0

    # 오대각
    if board[0][2] == 'O' and board[1][1] == 'O' and board[2][0] == 'O':
        o_bingo = True
    if board[0][2] == 'X' and board[1][1] == 'X' and board[2][0] == 'X':
        x_bingo = True
        
    if o_bingo and x_bingo: return 0

    if o_bingo:
        if os != xs + 1: return 0
    if x_bingo:
        if os != xs: return 0
    
    return 1

"""
이 게임판이 규칙을 지켜서 틱택토를 진행했을 때 나올 수 있는 게임 상황이면 1을 아니라면 0을 return

가로, 세로, 대각선으로 3개가 같은 표시가 만들어지면 같은 표시를 만든 사람이 승리하고 게임이 종료되며
9칸이 모두 차서 더 이상 표시를 할 수 없는 경우에는 무승부로 게임이 종료됩니다.

규칙 어기는 상황:
- "O"를 표시할 차례인데 "X"를 표시하거나 반대로 "X"를 표시할 차례인데 "O"를 표시한다.
    O와 X의 개수로 판단?
    -> O부터 시작해야되는데 X개수가 더 많으면 안됨
    -> O가 두개 이상 많으면 안됨
- 선공이나 후공이 승리해서 게임이 종료되었음에도 그 게임을 진행한다.
    가로 세로 대각선에 3개가 O와 X가 둘다 있으면 말이 안된다
    
[    
"O..",
".O.",
"XXO"
]


OXO
XOX
OXO

XOX
O.O
XOX

[
"O..",
"...",
"..."
]
    
"""