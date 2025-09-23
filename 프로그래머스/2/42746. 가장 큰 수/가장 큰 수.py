import functools

def compare(a, b):
    # 두 숫자를 문자열로 합쳐서 비교
    # b+a가 a+b보다 크면 양수 (b가 앞으로 와야 함)
    # a+b가 b+a보다 크면 음수 (a가 앞으로 와야 함)
    if a+b > b+a:
        return -1  # a를 앞으로
    elif a+b < b+a:
        return 1   # b를 앞으로
    else:
        return 0   # 순서 상관 없음

def solution(numbers):
    num_str = list(map(str, numbers))
    num_str.sort(key=functools.cmp_to_key(compare))
    
    return str(int("".join(num_str)))

"""
두 숫자를 어떤 순서로 이어 붙여야 더 큰 수가 되는지를 비교하는 것이 핵심입니다.

예를 들어, 3과 30 중 무엇이 먼저 와야 하는지는 330과 303을 비교해야 알 수 있고, 3이 먼저 와야 합니다.

반면, 3과 34 중 무엇이 먼저 와야 하는지는 334와 343을 비교해야 하고, 이때는 34가 먼저 와야 합니다.


5 547 54

9 5 34 3 30

979 97 978 818 81 817
97 979 978 818 81 817

"""