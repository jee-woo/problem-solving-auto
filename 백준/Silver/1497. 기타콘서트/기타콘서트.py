import sys

input = sys.stdin.readline

n, m = map(int, input().split())

guitars = [None for _ in range(n)]

answer = -1


def song_to_num(song):
  if song == 'Y':
    return '1'
  else:
    return '0'


for i in range(n):
  _, songs = input().split()
  songs = int(''.join(map(song_to_num, songs)), 2)  # 이진수 -> 정수로 변환
  guitars[i] = songs

count = 0
used = 0


def count_one(arr):
  a = 0
  for i in arr:
    a |= i
  c = bin(a).count('1')
  return c


for i in range(1 << n):
  subset = []

  for j in range(n):
    if i & (1 << j):
      subset.append(guitars[j])

  now_used = len(subset)
  now_count = count_one(subset)
  if now_count > count:
    used = now_used
    count = now_count
  elif now_count == count and used > now_used:
    used = now_used

if count > 0:
  answer = used
print(answer)