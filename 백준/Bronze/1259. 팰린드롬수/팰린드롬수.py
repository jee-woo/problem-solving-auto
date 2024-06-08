import math

user_input = ''

while user_input != '0':
  user_input = input()

  if user_input == '0':
    break

  custom_input = user_input

  while custom_input[0] == '0':
    custom_input = custom_input[1:]
  length = len(custom_input)
  front_half = custom_input[:length//2]
  back_half = custom_input[math.ceil(length/2):]
  if front_half == back_half[::-1]:
    print('yes')
  else:
    print('no')

