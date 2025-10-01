from collections import deque

def solution(storey):
    answer = 0
    
    str_s = deque(map(int, str(storey)))
    str_len = len(str_s)
    # print('start', str_s)
    
    i = str_len
    # for i in range(str_len-1, -1, -1):
    while True:
        i -= 1
        if i < 0: return answer
        num = str_s[i]
        if num == 0: continue
        
        if num >= 6:
            answer += (10-num)
            str_s[i] = 0
            if i-1 >= 0:
                str_s[i-1] += 1
                for j in range(i-1, -1, -1):
                    if str_s[j] == 10:
                        # print(j,'before', str_s)
                        str_s[j] = 0
                        if j > 0:
                            str_s[j-1] += 1
                        else:
                            str_s.appendleft(1)
                            i += 1
                        # print(j,'after', str_s)
                    else: break
                # if str_s[0] == 10:
                #     str_s.appendleft(1)
                #     i += 1
            else:
                str_s.appendleft(1)
                i += 1
        elif num == 5:
            str_s[i] = 0
            if i == 0:
                answer += 5
            else:
                if str_s[i-1] >= 5:
                    str_s[i-1] += 1
                    answer += 5
                else:
                    # str_s[i-1] -= 1
                    answer += 5
        else:
            answer += num
            str_s[i] = 0
        # print(str_s, answer)
    # print(str_s)
    return answer

"""
0층으로 가기 위해 필요한 마법의 돌의 최소값을 return

마법의 엘리베이터의 버튼은 특별합니다. 마법의 엘리베이터에는 -1, +1, -10, +10, -100, +100 등과 같이 절댓값이 10c (c ≥ 0 인 정수) 형태인 정수들이 적힌 버튼이 있습니다
단, 엘리베이터가 위치해 있는 층과 버튼의 값을 더한 결과가 0보다 작으면 엘리베이터는 움직이지 않습니다.

1 ≤ storey ≤ 100,000,000


[16]
-10
-1 * 6
-> 7

+1 * 4
-10 * 2
-> 6

10, 100 등에 가까운 수로 먼저 +/-로 이동.
그다음에 -하기

[2554]
-1000 * 2
-100 * 5
-10 * 5
-1 * 4

"""