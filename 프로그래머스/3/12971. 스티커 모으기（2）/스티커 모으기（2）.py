def solution(sticker):
    answer = 0
    n = len(sticker)
    if n == 1:
        return sticker[0]
    dp = [[0 for _ in range(2)] for _ in range(n)]
    dp[0][0] = sticker[0]
    dp[1][0] = dp[0][0]
    dp[0][1] = 0
    dp[1][1] = sticker[1]
    
    if n <= 2:
        return max(dp[n-1][0], dp[n-1][1])
    
    for i in range(2, n-1):
        dp[i][0] = max(dp[i-1][0], dp[i-2][0] + sticker[i])
        dp[i][1] = max(dp[i-1][1], dp[i-2][1] + sticker[i])
        

    dp[n-1][0] = dp[n-2][0]
    dp[n-1][1] = max(dp[n-3][1] + sticker[-1], dp[n-2][1])


    answer = max(dp[n-1][0], dp[n-1][1])
    return answer


"""
dp

i번째 뜯어냈을 때


                14  6  5 11  3  9  2 10
================================================
1: 이전X, 이번O   14  6  19 25 22 34 27 
2: 이전?, 이번X   0  14  14 19 25 25 34

3: 첫번X, 최대    0   6  6
4: 첫번O, 최대    14 14 19  

                1  3  2  5  4
================================================
1: 이전X, 이번O   1  3  3  8  8  
2: 이전?, 이번X   0  1  3  3  8
"""