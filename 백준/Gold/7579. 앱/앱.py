import sys

input = sys.stdin.readline

# n개 앱
# m 바이트 확보 필요
n, m = map(int, input().split())
byte = [0] + list(map(int, input().split()))
cost = [0] + list(map(int, input().split()))

MAX = 10000
# MAX = 135
INF = int(1e9)
dp = [[0 for _ in range(MAX+1)] for _ in range(n+1)]

# cost: 무게
# byte: 가치
# i: 앱

for i in range(1, n+1):  # 앱
  for j in range(MAX+1):  # cost index
    if j < cost[i]:
      dp[i][j] = dp[i-1][j]
    else:
      dp[i][j] = max(dp[i-1][j-cost[i]] + byte[i], dp[i-1][j])


# print(dp)


def solution():
  answer = INF
  for i in range(n+1):
    for j in range(MAX+1):
      if dp[i][j] >= m:
        answer = min(answer, j)

  print(answer)


solution()