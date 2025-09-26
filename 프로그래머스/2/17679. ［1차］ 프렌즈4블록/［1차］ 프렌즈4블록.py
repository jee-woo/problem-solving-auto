def solution(m, n, b):
    answer = 0
    
    board = [['0'] * n for _ in range(m)]
    for i in range(m):
        for j in range(n):
            board[i][j] = b[i][j]
    
    def check4(r, c, removed):
        remove_cnt = 0
        start = board[r][c]
        remove_arr = []
        # r, c부터 시작해서 오른쪽, 아래, 오른대각아래가 같은지 확인
        if c + 1 < n and board[r][c+1] == start:
            if not removed[r][c+1]: remove_cnt += 1
        else: return 0, []
        if r+1 < m and board[r+1][c] == start:
            if not removed[r+1][c]: remove_cnt += 1
        else: return 0, []
        if c+1 < n and r+1 < m and board[r+1][c+1] == start:
            if not removed[r+1][c+1]: remove_cnt += 1
        else: return 0, []
        if remove_cnt == 0: return 0, []
        if not removed[r][c]: remove_cnt += 1
        removed[r][c] = True
        removed[r+1][c] = True
        removed[r][c+1] = True
        removed[r+1][c+1] = True
        return remove_cnt, remove_arr
    
    # print(board)
    
    while True:
        removed = [[False] * n for _ in range(m)]
        for i in range(m):
            for j in range(n):
                if board[i][j] == '0':
                    removed[i][j] = True
        cnt = 0
        for i in range(m):
            for j in range(n):
                now_cnt, arr = check4(i, j, removed)
                # if now_cnt > 0: print(i, j, now_cnt)
                cnt += now_cnt
        if cnt == 0: break
        answer += cnt
                        
        # for i in range(m):
        #     print(removed[i])
        # print()
        new_board = [['0'] * n for _ in range(m)]
        
        # removed 부분 채우고 원래 부분 비우기
        # 거꾸로 순회
        for i in range(m-1, -1, -1):
            for j in range(n-1, -1, -1):
                # (i,j) 채우고 (k,j)비우기
                if board[i][j] == '0':
                    removed[i][j] = True
                if not removed[i][j]:
                    new_board[i][j] = board[i][j]
                    continue
                for k in range(i-1, -1, -1):
                    # print('i, j, k', i, j, k, removed[k][j])
                    if removed[k][j]: continue
                    new_board[i][j] = board[k][j]
                    new_board[k][j] = '0'
                    removed[i][j] = False
                    removed[k][j] = True
                    break
        # for i in range(m):
        #     print(removed[i])
        # print(cnt)
        # for i in range(m):
        #     print(new_board[i])
        # print()
        # break#
        board = new_board
    
    return answer

"""
2 ≦ n, m ≦ 30
입력으로 주어진 판 정보를 가지고 몇 개의 블록이 지워질지 출력하라.



"""
