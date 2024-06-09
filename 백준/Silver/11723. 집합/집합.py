from sys import stdin
from sys import stdout

N = int(input())

s = set()

output = []

for i in range(N):
  line = stdin.readline()
  line = line.strip()
  if ' ' in line:
    method, num = line.split()
    num = int(num)
  else:
    method = line
    num = None

  if method == 'add' and num not in s:
    s.add(num)
  elif method == 'remove' and num in s:
    s.remove(num)
  elif method == 'all':
    s = set(list(range(1, 21)))
  elif method == 'empty':
    s.clear()
  elif method == 'toggle':
    if num in s:
      s.remove(num)
    else:
      s.add(num) 
  elif method == 'check':
    if num in s:
      stdout.write(str(1) + '\n')
    else:
      stdout.write(str(0) + '\n')

