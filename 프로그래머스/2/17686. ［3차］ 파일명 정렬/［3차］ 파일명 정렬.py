def solution(files):
    answer = []
    splited = []
    
    # 1. HEAD, NUMBER, TAIL 분리 -> 튜플로(head,num,tail)
    for file in files:
        head = ''
        digit_i = 0
        n = len(file)
        for i in range(n):
            if str.isdigit(file[i]):
                digit_i = i
                break
            head += file[i]
        # print(head)
        number = ''
        tail_i = n
        for i in range(digit_i, n):
            if str.isdigit(file[i]) and i - digit_i <= 5:
                number += file[i]
            else:
                tail_i = i
                break
        # print(number)
        tail = ''
        for i in range(tail_i, n):
            tail += file[i]
        splited.append((head, number, tail))
    
    # print(splited)
    
    def sort_func(tup):
        return (tup[0].upper(), int(tup[1]))
    
    # 2. 정렬
    sorted_tuples = sorted(splited, key=sort_func)
    
    for tup in sorted_tuples:
        answer.append("".join(tup))
    
    return answer


"""
무지는 단순한 문자 코드 순이 아닌, 파일명에 포함된 숫자를 반영한 정렬 기능을 저장소 관리 프로그램에 구현하기로 했다.

영문 대소문자, 숫자, 공백(" "), 마침표("."), 빼기 부호("-")

HEAD:   숫자가 아닌 문자로 이루어져 있으며, 최소한 한 글자 이상
NUMBER: 0부터 99999 사이의 숫자. 앞쪽에 0이 올 수 있다.
TAIL:   그 나머지 부분으로, 여기에는 숫자가 다시 나타날 수도 있으며, 아무 글자도 없을 수 있다.


"""