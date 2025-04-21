def C(deleted, now, pm):
    if pm < 0:
        for i in range(-pm):
            now = now.prev
    elif pm > 0:
        for i in range(pm):
            now = now.next
    deleted.append(now)
    if now.prev:
        now.prev.next = now.next
    if now.next:
        now.next.prev = now.prev
    if now.next:
        now = now.next
    else:
        now = now.prev
    return deleted, now

def Z(deleted, now, pm):
    if pm < 0:
        for i in range(-pm):
            now = now.prev
    elif pm > 0:
        for i in range(pm):
            now = now.next
    d = deleted.pop()
    if d.prev:
        d.prev.next = d
    if d.next:
        d.next.prev = d
    return deleted, now

class Node:
    def __init__(self, idx):
        self.value = idx
        self.prev = None
        self.next = None

def solution(n, k, cmd):
    answer = ''
    deleted = []
    answer_arr = ['' for _ in range(n)]
    
    now = Node(0)
    tmp_k = None
    prev = None
    for i in range(n-1):
        now.prev = prev
        now.next = Node(i+1)
        prev = now
        if i == k:
            tmp_k = now
        now = now.next
    now.prev = prev
    
    if tmp_k:
        now = tmp_k
    pm = 0
    for c in cmd:
        if len(c) > 1:
            com, x = c.split()
            x = int(x)
        else:
            com = c
        if com == 'U':
            pm -= x
        elif com == 'D':
            pm += x
        elif com == 'C':
            deleted, now = C(deleted, now, pm)
            pm = 0
        elif com == 'Z':
            deleted, now = Z(deleted, now, pm)
            pm = 0
    
    # 검사
    while now.prev is not None:
        now = now.prev
    for i in range(n):
        if i != now.value:
            answer_arr[i] = 'X'
        else:
            answer_arr[i] = 'O'
            if now.next is not None:
                now = now.next
    answer = ''.join(answer_arr)
    return answer


"""
dict (enumerate)

1 <= X <= 300,000
U X
D X

C: 삭제 -> stack push (prev, next)
Z: 복구 -> stack pop

                행번호, idx
0 1 2 3 4 5 6 7 (2, 2)
0 1 2 3 5 6 7   (4, 5)
0 2 3 5 6 7     (1, 2)
0 2 3 5 6       (5, 7 -> 4, 6)
0 2 3 5 6 7     (2, 3)
0 1 2 3 5 6 7   (3, 3)
"""