import sys
input = sys.stdin.readline

n = int(input())
nums = []

for i in range(n):
    r, c = map(int, input().split())
    nums.append((r, c))

# dp[i][j] : 행렬 i부터 행렬 j까지 곱하는 최소 연산 횟수
dp = [[0] * n for _ in range(n)]

# 두 개의 행렬 곱셈 비용: dp[i][i+1]
for i in range(n - 1):
    dp[i][i + 1] = nums[i][0] * nums[i][1] * nums[i + 1][1]

# 연쇄 곱셈의 길이(L)를 3부터 n까지 고려
for L in range(3, n + 1):           # L : 몇 개 행렬을 연쇄적으로 곱하는지
    for i in range(n - L + 1):        # 시작 인덱스 i
        j = i + L - 1               # 끝 인덱스 j
        dp[i][j] = float('inf')
        # 가능한 모든 분할점 k (i ≤ k < j)에 대해 검사
        for k in range(i, j):
            cost = dp[i][k] + dp[k + 1][j] + nums[i][0] * nums[k][1] * nums[j][1]
            dp[i][j] = min(dp[i][j], cost)

print(dp[0][n - 1])
