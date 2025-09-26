def quad_zip(arr, zeros, ones, r, c, size):
    if size <= 1:
        return [zeros + 1 if arr[r][c] == 0 else zeros, ones + 1 if arr[r][c] == 1 else ones]
    
    same = True
    for i in range(r, r+size):
        for j in range(c, c+size):
            if i == r and j == c: continue
            if arr[i][j] != arr[r][c]:
                same = False
                break
        if not same: break
    if same:
        return [zeros + 1 if arr[r][c] == 0 else zeros, ones + 1 if arr[r][c] == 1 else ones]
        
    quads = [[r, c], [r, c+size//2], [r+size//2, c], [r+size//2, c+size//2]]
    for nr, nc in quads:
        new_zeros, new_ones = quad_zip(arr, zeros, ones, nr, nc, size//2)
        zeros = new_zeros
        ones = new_ones
    
    return [zeros, ones]

def solution(arr):
    #           0  1
    # answer = [0, 0]
    n = len(arr)
    
    zeros, ones = quad_zip(arr, 0, 0, 0, 0, n)
    
    return [zeros, ones]

"""
쿼드 압축
개수 세기

재귀



"""