import sys

input = sys.stdin.readline

n = int(input())
arr = [0 for _ in range(n)]

for i in range(n):
  arr[i] = int(input())

arr.sort()
two_set = set()


def dfs(i, depth, sum):
  if depth == 2:
    two_set.add(sum)
    return
  for j in range(i, n):
    dfs(j, depth+1, sum+arr[j])


dfs(-1, 0, 0)

# for x in arr:
#   for y in arr:
#     two_set.add(x+y)


def solution():
  for i in range(n-1, -1, -1):
    for j in range(i+1):
      if arr[i] - arr[j] in two_set:
        print(arr[i])
        return


solution()
