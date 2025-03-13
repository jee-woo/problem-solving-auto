import sys
input = sys.stdin.readline

answer_str = ''

while True:
  n = int(input())
  if n == 1:
    # print(0)
    answer_str += '0' + '\n'
    continue

  if n == 0:
    break
  answer = n

  for i in range(2, int(n**(1/2)) + 1):
    if n % i:
      continue
    while n % i == 0:
      n //= i
    answer *= ((i-1)/i)
  if n > 1:
    answer *= ((n-1)/n)

  # print(int(answer))
  answer_str += str(int(answer)) + '\n'

print(answer_str)
