def solution(numbers):
    str_numbers = [str(n) for n in numbers]
    
    # 예: '3' -> '333', '30' -> '303030'
    # '333'과 '303'을 비교하면 '3'이 '30'보다 앞으로 정렬됨
    str_numbers.sort(key=lambda x: x*3, reverse=True)
    
    answer = str(int(''.join(str_numbers)))
    return answer