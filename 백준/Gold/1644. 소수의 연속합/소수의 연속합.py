import sys

input = sys.stdin.readline

n = int(input())

arr = [False, False] + [True]*(n-1)
primes = []

for i in range(2, int(n)+1):
  if arr[i]:
    primes.append(i)
    for j in range(2*i, n+1, i):
      arr[j] = False

dp = [0 for _ in range(len(primes) + 1)]
# print(primes)
if len(primes) == 0:
  print(0)
else:
  dp[1] = primes[0]
  for i in range(1, len(dp)):
    dp[i] = dp[i-1] + primes[i-1]
  # print(dp)
  a_s = set()

  s = 0
  e = 1
  answer = 0
  while s < e and e <= len(dp)-1:
    # print(s, e)
    if dp[e] - dp[s] == n:
      # print(s, e)
      answer += 1
      a_s.add((s, e))

      s += 1
      e += 1
    elif dp[e] - dp[s] < n:
      e += 1
    else:
      s += 1


  print(answer)
