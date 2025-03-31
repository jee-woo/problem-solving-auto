import sys

input = sys.stdin.readline

n = int(input())
arr = [0 for _ in range(n)]

for i in range(n):
  arr[i] = int(input())

arr.sort()
two_set = set()

for x in arr:
  for y in arr:
    two_set.add(x+y)


def solution():
  for i in range(n-1, -1, -1):
    for j in range(i+1):
      if arr[i] - arr[j] in two_set:
        print(arr[i])
        return


solution()
