import sys

input = sys.stdin.readline

n = int(input())

alphabets = dict()  # 알파벳: 자리수 * 빈도
# 1. 자리수가 높은 알파벳일 수록 높은 수. 9 8 7 6 ...
# 2. 빈도가 10 이상 높을수록 높은 수

# 5자리: 10^5
# 1자리: 10^1

words = []

# print(10 ** 5)

for _ in range(n):
  word = input().strip()
  words.append(word)
  for i in range(len(word)):
    pos = len(word) - i
    if word[i] in alphabets:
      alphabets[word[i]] += 10 ** pos
    else:
      alphabets[word[i]] = 10 ** pos

# print(alphabets)

sorted_al = sorted(alphabets, key=lambda x: -alphabets[x])

# print(sorted_al)

num_dict = dict()

for i in range(len(sorted_al)):
  num_dict[sorted_al[i]] = 10 - i - 1

# print(num_dict)

answer = 0
for w in words:
  num = ''
  for i in w:
    num += str(num_dict[i])
  answer += int(num)


print(answer)
# al = list(alphabets)

# al.sort(key=lambda x: x[1])

# print(al)
