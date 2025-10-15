def solution(rows, columns, queries):
    answer = []
    n = len(queries)
    
    table = [[0] * columns for _ in range(rows)]
    for i in range(rows):
        for j in range(columns):
            table[i][j] = (i * columns) + j + 1
    
    # print(table)
    def rotate_frame(x1, y1, x2, y2):
        min_num = table[x1][y1]
        next_num = table[x1][y1]
        
        # 위의 행 x1
        for j in range(y1+1, y2+1):
            temp = table[x1][j]
            table[x1][j] = next_num
            min_num = min(table[x1][j], min_num)
            next_num = temp
        
        # print(table[x1])
        
        # 오른쪽 열 y2
        for i in range(x1+1, x2+1):
            # print(i, y2)
            temp = table[i][y2]
            table[i][y2] = next_num
            min_num = min(table[i][y2], min_num)
            next_num = temp
        
        # 아래 행 x2
        for j in range(y2-1, y1-1, -1):
            temp = table[x2][j]
            table[x2][j] = next_num
            min_num = min(table[x2][j], min_num)
            next_num = temp
        
        # 왼쪽 열 y1
        for i in range(x2-1, x1-1, -1):
            temp = table[i][y1]
            table[i][y1] = next_num
            min_num = min(table[i][y1], min_num)
            next_num = temp
        
        return min_num
    # for i in range(rows):
    #     print(table[i])
    # print()
    for x1, y1, x2, y2 in queries:
        min_num = rotate_frame(x1-1, y1-1, x2-1, y2-1)
        answer.append(min_num)
    # for i in range(rows):
    #     print(table[i])
    return answer

"""
회전들의 목록 queries가 주어질 때, 각 회전들을 배열에 적용한 뒤,
그 회전에 의해 위치가 바뀐 숫자들 중 가장 작은 숫자들을 순서대로 배열에 담아 return

1 <= n <= 10_000
2 <= rows <= 100
2 <= columns <= 100
"""