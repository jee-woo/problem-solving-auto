def solution(picks, minerals):
    answer = 0
    total_pick = 0
    for p in picks:
        total_pick += p
    if total_pick == 0: return 0
    n = len(minerals)
    pi = -1
    min_five = []
    for i in range(n):
        if i % 5 == 0:
            pi += 1
            if pi >= total_pick: break
            min_five.append([0,0,0])
        if minerals[i] == 'diamond': # diamond 광물
            min_five[pi][0] += 1
            min_five[pi][1] += 5
            min_five[pi][2] += 25
        elif minerals[i] == 'iron':
            min_five[pi][0] += 1
            min_five[pi][1] += 1
            min_five[pi][2] += 5
        elif minerals[i] == 'stone':
            min_five[pi][0] += 1
            min_five[pi][1] += 1
            min_five[pi][2] += 1
    min_five.sort(key=lambda x: (-x[2], -x[1], -x[0]))
    
    # print(min_five)
    dc = 0
    ic = 0
    for i in range(picks[0]): # diamond 곡괭이
        if i >= len(min_five): break
        answer += min_five[i][0]
        dc += 1
    for i in range(picks[1]):
        if i+dc >= len(min_five): break
        answer += min_five[i+dc][1]
        ic += 1
    for i in range(picks[2]):
        if i+dc+ic >= len(min_five): break
        answer += min_five[i+dc+ic][2]
    # print(answer, pi)
    
    return answer

"""
곡괭이 5번 쓰면 다음 곡괭이로 넘어감

5씩 나눠서 각 곡괭이일 때 피로도 저장?
 d, i, s
[
[5,25,125], 0~4
[5,5,25], 5~9
# [1,5,25], 10
]

곡괭이 개수에 따른 캘 수 있는 광물 수 구하기
[1,3,2] -> 6개 -> min(30, 8)개 = 8개
[0,1,1] -> 2개 -> min(11, 10)개 = 10개


"""