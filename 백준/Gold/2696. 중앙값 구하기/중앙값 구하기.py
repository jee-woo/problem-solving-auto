import sys
import heapq

input = sys.stdin.readline


def solution(m, nums):
  q = []
  tmp = []
  answer = []
  # print(m, nums)
  for i in range(m):
    heapq.heappush(q, nums[i])
    if i % 2 == 0:
      tmp = q[:]

      for j in range(len(tmp) // 2):
        heapq.heappop(q)

      # print(i, tmp)
      answer.append(str(q[0]))
      q = tmp[:]

  print(len(answer))
  for i in range(len(answer) // 10 + 1):
    print(' '.join(answer[10*i:10*(i+1)]))


t = int(input())

for i in range(t):
  m = int(input())
  nums = []
  for j in range(m // 10 + 1):
    nums += list(map(int, input().split()))
  solution(m, nums)
