def check(bin_str):
    """
    주어진 이진 문자열이 표현 가능한 이진트리인지 재귀적으로 확인하는 함수
    """
    # 베이스 케이스: 노드가 하나면 항상 유효
    if len(bin_str) == 1:
        return True
    
    # 루트 노드와 왼쪽/오른쪽 서브트리를 나눔
    mid = len(bin_str) // 2
    root = bin_str[mid]
    left_subtree = bin_str[:mid]
    right_subtree = bin_str[mid+1:]
    
    # 루트가 '0'(더미)인데 자식 중에 '1'이 있으면 규칙 위반
    if root == '0' and ('1' in left_subtree or '1' in right_subtree):
        return False
        
    # 분할 정복: 왼쪽과 오른쪽 서브트리에 대해 재귀적으로 확인
    return check(left_subtree) and check(right_subtree)

def solution(numbers):
    answer = []
    for num in numbers:
        # 1. 전처리: 이진 문자열로 변환
        bin_num = bin(num)[2:]
        bin_len = len(bin_num)
        
        # 2. 전처리: 포화 이진트리 길이 맞추기
        tree_height = 0
        tree_size = 0
        while tree_size < bin_len:
            tree_height += 1
            tree_size = 2**tree_height - 1
            
        # 앞에 '0'을 붙여(패딩) 길이 맞추기
        padded_bin_num = '0' * (tree_size - bin_len) + bin_num
        
        # 3. 재귀 함수로 판별
        if check(padded_bin_num):
            answer.append(1)
        else:
            answer.append(0)
            
    return answer