import sys

input = sys.stdin.readline

n = int(input())

rgbs = [([]) for _ in range(n)]

for i in range(n):
  rgbs[i] = list(map(int, input().split()))

INF = int(1e9)
answer = INF

for first in range(3):
  dp = [[-1] * 3 for _ in range(n)]
  dp[0] = [INF, INF, INF]
  dp[0][first] = rgbs[0][first]

  for i in range(1, n):
    dp[i][0] = min(dp[i-1][1], dp[i-1][2]) + rgbs[i][0]
    dp[i][1] = min(dp[i-1][0], dp[i-1][2]) + rgbs[i][1]
    dp[i][2] = min(dp[i-1][0], dp[i-1][1]) + rgbs[i][2]

  answer = min(answer, dp[n-1][(first + 1) % 3], dp[n-1][(first + 2) % 3])

print(answer)
