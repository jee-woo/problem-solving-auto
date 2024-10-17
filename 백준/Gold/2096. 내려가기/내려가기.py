import sys

input = sys.stdin.readline

n = int(input())

points = [_ for _ in range(n)]

for i in range(n):
  a, b, c = map(int, input().split())
  points[i] = (a, b, c)

# 메모리 절약을 위해 2행 3열의 배열 사용
dp_min = [[0] * 3 for _ in range(2)]
dp_max = [[0] * 3 for _ in range(2)]

# 초기값 설정
dp_min[0] = [points[0][0], points[0][1], points[0][2]]
dp_max[0] = [points[0][0], points[0][1], points[0][2]]

# DP 계산
for i in range(1, n):
  current = i % 2
  previous = (i - 1) % 2

  dp_min[current][0] = min(
      dp_min[previous][0], dp_min[previous][1]) + points[i][0]
  dp_min[current][1] = min(
      dp_min[previous][0], dp_min[previous][1], dp_min[previous][2]) + points[i][1]
  dp_min[current][2] = min(
      dp_min[previous][1], dp_min[previous][2]) + points[i][2]

  dp_max[current][0] = max(
      dp_max[previous][0], dp_max[previous][1]) + points[i][0]
  dp_max[current][1] = max(
      dp_max[previous][0], dp_max[previous][1], dp_max[previous][2]) + points[i][1]
  dp_max[current][2] = max(
      dp_max[previous][1], dp_max[previous][2]) + points[i][2]

# 마지막 값은 n-1번째 행에 저장된 결과 사용
last_row = (n - 1) % 2
print(
    max(dp_max[last_row][0], dp_max[last_row][1], dp_max[last_row][2]),
    min(dp_min[last_row][0], dp_min[last_row][1], dp_min[last_row][2])
)
