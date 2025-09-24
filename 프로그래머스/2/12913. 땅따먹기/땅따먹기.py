def solution(land):
    answer = 0
    n = len(land)
    
    # 0열부터 3열까지 시작 열
    dp = [[0] * 4 for _ in range(n)]
    dp[0] = land[0].copy()

    for i in range(1, n):
        dp[i][0] = max(dp[i-1][1], dp[i-1][2], dp[i-1][3]) + land[i][0]
        dp[i][1] = max(dp[i-1][0], dp[i-1][2], dp[i-1][3]) + land[i][1]
        dp[i][2] = max(dp[i-1][0], dp[i-1][1], dp[i-1][3]) + land[i][2]
        dp[i][3] = max(dp[i-1][0], dp[i-1][1], dp[i-1][2]) + land[i][3]
    
    answer = max(dp[n-1])
    return answer