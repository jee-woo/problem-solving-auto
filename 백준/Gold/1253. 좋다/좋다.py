import sys


input = sys.stdin.readline

n = int(input())

nums = list(map(int, input().split()))
nums.sort()

count = 0

for i in range(n):
  l = 0
  r = n-1
  while l < r:
    if i == l:
      l += 1
      continue
    if i == r:
      r -= 1
      continue
    summ = nums[l] + nums[r]
    if summ == nums[i]:
      count += 1
      break
    elif summ < nums[i]:
      l += 1
    else:
      r -= 1
print(count)
