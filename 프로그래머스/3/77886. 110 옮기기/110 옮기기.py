def solution(s):
    answer = []
    n = len(s)
    
    for nums in s:
        m = len(nums)
        
        stack = []
        cnt = 0
        
        for i in range(m):
            if len(stack) >= 2 and nums[i] == '0' and stack[-2] == '1' and stack[-1] == '1':
                stack.pop()
                stack.pop()
                cnt += 1
                continue
            stack.append(nums[i])
        # print(stack)
        added = False
        for i in range(len(stack)-1, -1, -1):
            if stack[i] == '0':
                # print(i, stack)
                new_nums = "".join(stack[0:i+1]) + '110'*cnt
                if i < len(stack)-1:
                    new_nums += "".join(stack[i+1:])
                answer.append(new_nums)
                added = True
                break
        if not added:
            answer.append('110'*cnt + "".join(stack))
    
    return answer

"""
각 문자열에 대해서 위의 행동으로 변형해서 만들 수 있는 문자열 중
사전 순으로 가장 앞에 오는 문자열을 배열에 담아 return

110 기준으로 split?

0이 앞에 와야 사전순으로 앞선다.
마지막 0보다 뒤에?

한 인덱스씩 지나가면서 지금이 110이면 마지막 0위치 뒤로 이동
마지막 0위치 갱신 (110)

10011(110)0
-> 100110
100(110)110
= 100110110


01111(110)10
-> 0111110
0(110)111110

0110111(110)
-> 0110(110)111
= 0110110111

바꿔도 똑같으면 바꾸지 않기

"""