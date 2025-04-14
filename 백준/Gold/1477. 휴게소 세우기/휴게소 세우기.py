import sys
import math

input = sys.stdin.readline

n, m, l = map(int, input().split())

rests = [0] + list(map(int, input().split())) + [l]

left = 0
right = l
answer = 0

rests.sort()

for i in range(1, n+2):
  right = max(right, rests[i] - rests[i-1])


def is_possible(mid):
  # rests 돌면서 사이마다 몇개 필요한지 확인
  count = 0
  for i in range(1, n+2):
    gap = rests[i] - rests[i-1]
    c = math.ceil(gap / mid)-1
    now = 0
    for _ in range(c + 1):
      now += mid
    if rests[i-1] + now < rests[i]:
      return False
    count += c
    if count > m:
      return False
  return True


while left < right:
  mid = (left + right) // 2
  if mid == 0:
    break
  if is_possible(mid):
    answer = mid
    right = mid
  else:
    left = mid + 1


print(answer)