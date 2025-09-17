def solution(s):
    answer = 0
    n = len(s)
    
    dp = [[0] * n for _ in range(n)]
    
    for i in range(n):
        dp[i][i] = 1
    
    for i in range(n-1):
        if s[i] == s[i+1]:
            dp[i][i+1] = 2
    
    for leng in range(3, n + 1):
        for start in range(n - leng + 1):
            end = start + leng - 1
            if s[start] == s[end] and dp[start+1][end-1] > 0:
                dp[start][end] = dp[start+1][end-1] + 2
    
    for i in range(n):
        answer = max(answer, max(dp[i]))

    return answer


"""
abcdcba



abacde

"""