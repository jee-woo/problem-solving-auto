def solution(board, skill):
    answer = 0
    N = len(board)
    M = len(board[0])
    
    # 1. 변화량을 기록할 (N+1)x(M+1) 크기의 배열 생성
    delta = [[0] * (M + 1) for _ in range(N + 1)]

    # 2. 모든 스킬의 영향력을 delta 배열에 O(1)로 기록
    for type, r1, c1, r2, c2, degree in skill:
        # 공격 스킬이면 degree를 음수로 변경
        if type == 1:
            d = -degree
        else:
            d = degree
        
        # 네 꼭짓점에 변화량 표시
        delta[r1][c1] += d
        delta[r1][c2 + 1] -= d
        delta[r2 + 1][c1] -= d
        delta[r2 + 1][c2 + 1] += d

    # 3. 누적 합 계산
    # 3-1. 가로 방향(열 기준)으로 누적 합
    for i in range(N + 1):
        for j in range(1, M + 1):
            delta[i][j] += delta[i][j - 1]
    
    # 3-2. 세로 방향(행 기준)으로 누적 합
    for j in range(M + 1):
        for i in range(1, N + 1):
            delta[i][j] += delta[i - 1][j]
            
    # 4. 기존 배열과 변화량 배열을 합쳐서 파괴되지 않은 건물 계산
    for i in range(N):
        for j in range(M):
            if board[i][j] + delta[i][j] > 0:
                answer += 1
                
    return answer