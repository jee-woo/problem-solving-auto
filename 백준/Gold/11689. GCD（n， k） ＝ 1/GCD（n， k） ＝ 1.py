import sys
input = sys.stdin.readline

n = int(input())

# 약수 구하기
yak = []
i = 2
while i * i <= n:
  if n % i == 0:
    yak.append(i)
    if i * i != n:
      yak.append(n // i)
  i += 1

yak.sort()


def get_primes(yak):
  primes = []
  flag = True
  # yak을 순회하면서 나누어 떨어지는 수가 있으면 소수가 아님
  for i in range(len(yak)):
    for j in range(0, i):
      if yak[i] % yak[j] == 0:
        flag = False
        break
    if flag:
      primes.append(yak[i])
    flag = True
  return primes


primes = get_primes(yak)

if n == 1:
  print(1)
elif len(primes) == 0:
  print(n-1)
else:

  answer = n

  # for y in yak:
  #   answer -= n // y

  sum = [0]

  # print(yak)
  # print('answer', answer)

  def get_combs(i, count, primes, comb):
    if len(comb) == count:
      tmp = 1
      for c in comb:
        tmp *= c
      sum[0] += n // tmp
      # print(comb)
      return
    for j in range(i + 1, len(primes)):
      comb.append(primes[j])
      get_combs(j, count, primes, comb)
      comb.pop()

  for i in range(1, len(primes) + 1):
    get_combs(-1, i, primes, [])

    if i % 2 == 1:
      answer -= sum[0]
    else:
      answer += sum[0]
    sum[0] = 0

  print(answer)
