import sys

input = sys.stdin.readline

n = int(input())

pos_nums = []
neg_nums = []

for i in range(n):
  num = int(input())
  if num > 0:
    pos_nums.append(num)
  else:
    neg_nums.append(num)

pos_nums.sort(key=lambda x: (-abs(x)))
neg_nums.sort(key=lambda x: (-abs(x)))

answer = 0
i = 0
while i < len(pos_nums):
  if i < len(pos_nums) - 1 and (pos_nums[i] * pos_nums[i+1] > pos_nums[i] + pos_nums[i+1]):
    answer += pos_nums[i] * pos_nums[i+1]
    i += 2
  else:
    answer += pos_nums[i]
    i += 1

i = 0
while i < len(neg_nums):
  if i < len(neg_nums) - 1 and (neg_nums[i] * neg_nums[i+1] > neg_nums[i] + neg_nums[i+1]):
    answer += neg_nums[i] * neg_nums[i+1]
    i += 2
  else:
    answer += neg_nums[i]
    i += 1

  # print('answer', answer)


print(answer)
