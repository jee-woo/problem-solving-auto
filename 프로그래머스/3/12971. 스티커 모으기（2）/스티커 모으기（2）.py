def solution(sticker):
    answer = 0
    n = len(sticker)
    if n <= 2:
        return max(sticker)
    dp = [[0 for _ in range(2)] for _ in range(n)]
    dp[0][0] = sticker[0]
    dp[1][0] = dp[0][0]
    dp[0][1] = 0
    dp[1][1] = sticker[1]
    
    for i in range(2, n-1):
        dp[i][0] = max(dp[i-1][0], dp[i-2][0] + sticker[i])
        dp[i][1] = max(dp[i-1][1], dp[i-2][1] + sticker[i])
        

    dp[n-1][0] = dp[n-2][0]
    dp[n-1][1] = max(dp[n-3][1] + sticker[-1], dp[n-2][1])


    answer = max(dp[n-1][0], dp[n-1][1])
    return answer


"""
dp
"""