def solution(triangle):
    answer = 0
    dp = [None for _ in range(len(triangle))]
    for i in range(len(dp)):
        dp[i] = [0] * (i+1)
    dp[0][0] = triangle[0][0]
    
    for i in range(1, len(dp)):
        dp[i][0] = dp[i-1][0] + triangle[i][0]
        dp[i][-1] = dp[i-1][-1] + triangle[i][-1]
        for j in range(1, i):
            dp[i][j] = max(dp[i-1][j-1], dp[i-1][j]) + triangle[i][j]
            
    answer = max(dp[-1])
    
    return answer