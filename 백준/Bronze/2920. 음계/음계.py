melody = list(map(int, input().strip().split()))

asc_scale = [1, 2, 3, 4, 5, 6, 7, 8]
desc_scale = [8, 7, 6, 5, 4, 3, 2, 1] 

if melody[0] == 1:
  for i in range(len(melody)):
    if melody[i] != asc_scale[i]:
      print('mixed')
      break
    elif melody[i] == asc_scale[i] and i == 7:
      print('ascending')
elif melody[0] == 8:
  for i in range(len(melody)):
    if melody[i] != desc_scale[i]:
      print('mixed')
      break
    elif melody[i] == desc_scale[i] and i == 7:
      print('descending')
else:
  print('mixed')