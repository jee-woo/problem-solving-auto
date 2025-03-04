import sys
INF = int(1e9 + 1)

input = sys.stdin.readline


def construct(size, n, nums):
  tree = [n for _ in range(size * 2)]

  # leaf 초기화 (index)
  for i in range(size, size + n):
    tree[i] = i-size

  # 부모
  for i in range(size-1, 0, -1):
    if nums[tree[i*2]] <= nums[tree[i*2+1]]:
      tree[i] = tree[i*2]
    else:
      tree[i] = tree[i*2+1]

  return tree


def update(i, v, tree, size, nums):
  # i -> v
  i += size

  # 부모
  while i > 1:
    i //= 2
    if nums[tree[i*2]] <= nums[tree[i*2+1]]:
      tree[i] = tree[i*2]
    else:
      tree[i] = tree[i*2+1]

  return tree


def segment(l, r, nl, nr, nn, size, tree, n, nums):
  if nr < l or nl > r:
    return n
  if l <= nl and nr <= r:
    return tree[nn]
  mid = (nl + nr) // 2

  left = segment(l, r, nl, mid, nn * 2, size, tree, n, nums)
  right = segment(l, r, mid + 1, nr, nn * 2 + 1, size, tree, n, nums)

  if nums[left] <= nums[right]:
    return left
  else:
    return right


def solution():
  n = int(input())
  nums = list(map(int, input().split()))
  nums.append(INF)
  m = int(input())

  size = 1

  while size < n:
    size *= 2

  tree = construct(size, n, nums)

  answer = []
  for _ in range(m):
    a, b, c = map(int, input().split())
    if a == 1:
      nums[b-1] = c
      tree = update(b - 1, c, tree, size, nums)
    elif a == 2:
      answer.append(
          str(segment(b-1, c-1, 0, size-1, 1, size, tree, n, nums) + 1))
      # print()

  print('\n'.join(answer))


solution()
