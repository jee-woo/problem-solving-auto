def solution(n, money):
    MOD = 1_000_000_007
    answer = 0
    m = len(money)
    
    dp = [0 for _ in range(n+1)]
    dp[0] = 1
    
    for coin in money:
        for amount in range(coin, n+1):
            dp[amount] = (dp[amount] + dp[amount-coin]) % MOD
    
    return dp[n]

"""
n원 거슬러주기

1 <= i <= n
dp[i]: 

0   1   2   3   4   5
----------------------
0   1   2   2   3   4
    1
        11
        2   
            111
            12
                1111
                112
                22

                    1,1,1,1,1
                    1,1,1,2
                    1,2,2
                    5
                    -> 4가지


1, 1, 1
1, 2
"""