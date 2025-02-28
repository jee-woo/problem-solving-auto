import heapq
import sys

input = sys.stdin.readline


def solution():
  n = int(input())
  classes = []
  # print(n)
  for _ in range(n):
    s, e = map(int, input().split())
    # print(s, e)
    classes.append((s, e))

  classes.sort(key=lambda x: x[0])
  q = []

  # print(classes)

  # 끝나는 시간 -> 우선순위 큐
  heapq.heappush(q, classes[0][1])
  # print(q)

  cnt = 1
  for s, e in classes[1:]:
    if q[0] <= s:
      heapq.heappop(q)
      heapq.heappush(q, e)
    else:
      heapq.heappush(q, e)
      cnt += 1

  print(cnt)


solution()
