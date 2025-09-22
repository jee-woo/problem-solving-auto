def rotate(key):
    m = len(key)
    new_key = [[0] * m for _ in range(m)]
    for i in range(m):
        for j in range(m):
            new_key[i][j] = key[j][m-i-1]
    return new_key

def shift(key, si, sj, n):
    m = len(key)
    new_key = [[0] * n for _ in range(n)]
    for i in range(m):
        for j in range(m):
            if i+si < 0 or i+si >= n or j+sj < 0 or j+sj >=n: continue
            # new_key[i][j] = key[i+si][j+sj]
            new_key[i+si][j+sj] = key[i][j]
            
    return new_key

def bit(arr2d):
    arr = []
    for i in range(len(arr2d)):
        bit_bin = int("".join(map(str, arr2d[i])), 2)
        arr.append(bit_bin)
    return arr
    
def solution(key, lock):
    # 1. key 회전하지 않고 (0,0) ~ (n,n)에서 시작하도록
    # 2. key 90도 회전하고 ...
    # 3. 180
    # 4. 270
    n = len(lock)
    m = len(key)
    for k in range(4):
        key = rotate(key)
        # print("!!!")
        # for j in range(len(key)):
        #     print(key[j])
        # print()
        # key 시작 위치
        for i in range(-(m-1), n):
            for j in range(-(m-1), n):
                shift_key = shift(key, i, j, n)
                # for f in range(len(shift_key)):
                #     print(shift_key[f])
                # print()
                bit_key = bit(shift_key)
                bit_lock = bit(lock)
                
                possible = True
                for b in range(n):
                    if bit_key[b] ^ bit_lock[b] != 2 ** n - 1:
                        possible = False
                        break
                        
                if possible:
                    return True
                
    return False

"""
비트마스킹?

열쇠로 자물쇠를 열수 있으면 true를, 열 수 없으면 false를 return

열쇠 회전 또는 이동 가능

90도 회전 -> 4방향
(n = 3일 경우) 이동 -> 좌 2, 우 2, 상 2, 하 2
(n-1)**3

4*(n-1)**3 = O(n^3) 최대 약 24000회

O(n^3) * n = O(n^4) = 최대 약 80만
         각 행에서 비트마스킹


1. key 회전하지 않고 (0,0) ~ (n,n)에서 시작하도록
2. key 90도 회전하고 ...
3. 180
4. 270


비트마스킹
둘다 1이면 안됨
0과 1의 만남이어야 가능

"""