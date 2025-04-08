import sys
sys.setrecursionlimit(100001)

input = sys.stdin.readline

n, m = map(int, input().split())

size = 1

while size <= n:
  size *= 2

INF = int(1e9)


tree = [INF for _ in range(size*2+1)]
nums = [0 for _ in range(n)]

for i in range(n):
  nums[i] = int(input())


def construct(nums):
  for i in range(size, size + len(nums)):
    tree[i] = nums[i-size]
  for i in range(size - 1, 0, -1):
    tree[i] = min(tree[i*2], tree[i*2+1])


construct(nums)


def segment(l, r, nl, nr, nn):
  if nr < l or nl > r:
    return INF
  if l <= nl and nr <= r:
    return tree[nn]
  mid = (nl + nr) // 2
  return min(segment(l, r, nl, mid, nn*2), segment(l, r, mid+1, nr, nn*2+1))


for i in range(m):
  a, b = map(int, input().split())
  minn = segment(a-1, b-1, 0, size-1, 1)
  print(minn)
