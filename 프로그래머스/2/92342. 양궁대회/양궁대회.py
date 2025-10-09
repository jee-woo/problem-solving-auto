def solution(n, info):
    answer = [-1]
    # 10은 a로 치환
    answer_set = []
    max_score_sub = 0
    def dfs(cnt, a_score, r_score, level, r_info):
        nonlocal max_score_sub
        nonlocal answer
        if level == 11 or level >= len(info):
            if cnt < n:
                r_info = r_info[:-1] + str(n-cnt)
            if r_score - a_score > max_score_sub:
                max_score_sub = r_score - a_score
                answer_set.append((r_info, max_score_sub))
            elif r_score - a_score == max_score_sub:
                for i in range(10, -1, -1):
                    if int(r_info[i]) > info[i]:
                        answer_set.append((r_info, max_score_sub))
                        break
                
            return
        
        
        if info[level] == 0:
            dfs(cnt, a_score, r_score, level+1, r_info+str(0)) # 둘다 스코어 획득 X
            
        if info[level] > 0:
            dfs(cnt, a_score+(10-level), r_score, level+1, r_info+str(0)) # A 스코어 획득
        
        need_to_win = info[level]+1
        need_to_win_str = str(need_to_win)
        if need_to_win == 10:
            need_to_win_str = 'a'
        
        if cnt+need_to_win > n: return
    
        dfs(cnt+need_to_win, a_score, r_score+(10-level), level+1, r_info+need_to_win_str) # R 스코어 획득
        
        return
    
    dfs(0, 0, 0, 0, '')
    answer_set.sort(key=lambda x: (-x[1], ''.join(reversed(x[0]))))
    # print(answer_set)
    if len(answer_set) == 0: return [-1]
    if answer_set[0][1] == 0: return [-1]
    
    max_score_sub = answer_set[0][1]
    answer_str = answer_set[0][0]
    for s, sub in answer_set:
        if sub < max_score_sub: break
        answer_str = s
    
    answer = [0] * 11
    for i in range(11):
        if answer_str[i] == 'a':
            answer[i] = 10
        else:
            answer[i] = int(answer_str[i])
    
    return answer

"""
라이언이 가장 큰 점수 차이로 우승하기 위해 n발의 화살을 어떤 과녁 점수에 맞혀야 하는지를
10점부터 0점까지 순서대로 정수 배열에 담아 return

만약, 라이언이 우승할 수 없는 경우(무조건 지거나 비기는 경우)는 [-1]을 return

라이언이 가장 큰 점수 차이로 우승할 수 있는 방법이 여러 가지 일 경우, 가장 낮은 점수를 더 많이 맞힌 경우를 return
1 <= n <= 10

그리디
1-0 냅색

완탐??

pt  A   R
10	2	0	0: -10, 1: -10, 2: -10, 3: 10 (-10 / 3.x)
9	1	2	0: -9,  1: -9,  2: 9 (-9 / 4.5)
8	1	2	0: -8,  1: -8,  2: 8 (-8 / 4)
7	1	0	0: -7,  1: -7,  2: 7 (-7 / 3.5)
6	0	1	0: 0,   1: 6 (-6 / 6)
5	0	0   0: 0,   1: 5 (-5 / 5)
4	0	0	0: 0,   1: 4 (-4 / 4)
3	0	0	
2	0	0	
1	0	0	
0	0	0

n=10
pt  A   R
10	0	1	0: -10, 1: 10 (-10 / 10)
9	0	1	0: -9,  1: 10 (-9 / 9)
8	1	2	0: -8,  1: -8,  2: 8 (-8 / 4)
7	2	0	0: -7,  1: -7,  2: -7,  3: 7 (-7 / 2.x)
6	0	1	0: 0,   1: 6 (-6 / 6)
5	1	2	0: -5,  1: -5,  2: 5 (-5 / 2.5)
4	1	2	0: -4,  1: -4,  2: 4 (-4 / 2)
3	1	0	어피치가 3점 획득
2	1	0	어피치가 2점 획득
1	1	0	어피치가 1점 획득
0	1	0

"""