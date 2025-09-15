def solution(money):
    answer = 0
    n = len(money)
    
    # 0번째 집 털었을 때
    dp = [0] * n
    dp[0] = money[0]
    dp[1] = max(money[0], money[1])
    
    for i in range(2, n-1):
        dp[i] = max(dp[i-2] + money[i], dp[i-1])
    
    dp[n-1] = dp[n-2]
    # print(dp)
    temp1 = dp[-1]
    
    # 0번째 집 안털었을 때
    dp = [0] * n
    dp[1] = money[1]
    for i in range(2, n-1):
        dp[i] = max(dp[i-2] + money[i], dp[i-1])
        
    # print(dp)
        
    dp[n-1] = dp[n-3] + money[n-1]
    # print(dp)
    temp2 = dp[-1]
    
    return max(temp1, temp2)