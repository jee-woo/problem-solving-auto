import sys

input = sys.stdin.readline

n = int(input())

answer = [0] * 10


def count(n, digit):
  # n: 현재 N
  # digit: 자리수 (1, 10, 100, ...)
  high = n // (digit * 10)
  cur = (n // digit) % 10
  low = n % digit

  for i in range(10):
    if i < cur:
      answer[i] += (high + 1) * digit
    elif i == cur:
      answer[i] += high * digit + (low + 1)
    else:
      answer[i] += high * digit

  if digit >= 1:
    answer[0] -= digit  # 0은 맨 앞자리에는 못 오므로 보정


digit = 1
while n // digit > 0:
  count(n, digit)
  digit *= 10


print(' '.join(map(str, answer)))