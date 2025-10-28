def str_to_time(time_str):
    h, m = time_str.split(':')
    h = int(h)
    m = int(m)
    return h * 60 + m

def solution(plans):
    answer = []
    n = len(plans)
    
    # formatting
    for i in range(n):
        time_str = plans[i][1]
        time = str_to_time(time_str)
        pt = int(plans[i][2])
        plans[i][1] = time
        plans[i][2] = pt
    
    plans.sort(key=lambda x: x[1])
    # print('plans', plans)
    stop_stack = []
    now = 0
    for i, (name, start, playtime) in enumerate(plans):
        # print(now,name, stop_stack)
        # print(now)
        if i == n-1:
            answer.append(name)
            break
            # while stop_stack and now + stop_stack[-1][1] < start:
            #     fin_name, _ = stop_stack.pop()
            #     # print('마지막',fin_name)
            #     answer.append(fin_name)
            # answer.append(name)
            # break #
        now = start
        # 현재 과제 할만큼 하고 스택에 넣기
        if i < n-1 and plans[i+1][1] < start + playtime:
            stop_stack.append([name, playtime-(plans[i+1][1] - start)])
            # print('stack으로', stop_stack)
        else:
            # print('바로 시작', name, now)
            answer.append(name)
            now = start + playtime
            while stop_stack and now <= plans[i+1][1]:
                remain = stop_stack[-1][1]
                stop_stack[-1][1] -= (plans[i+1][1] - now)
                if stop_stack[-1][1] <= 0: # stack 마지막에 있던거 다 끝나면
                    now += remain
                    fin_name, _ = stop_stack.pop()
                    # print('pop', fin_name, now)
                    answer.append(fin_name)
                else:
                    break
    while stop_stack:
        name, _ = stop_stack.pop()
        answer.append(name)
    
    return answer

"""
과제를 끝낸 순서대로 이름을 배열에 담아 return 

 plans = [ [ "A", "00:00", "60" ] , [ "B", "00:10", "60" ] , [ "C", "00:20", "60" ] , [ "D", "02:20", "60" ] , [ "E", "03:20", "10" ] , [ "F", "03:40", "20" ] , [ "G", "04:40", "60" ] ]

답 : ["C", "B", "D", "E", "F", "A", "G"]

4, 5, 6, 10 만 틀렸었는데

"""
