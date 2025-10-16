def solution(n, build_frame):
    answer = []
    pillar_graph = set() # 좌표부터 왼->오
    beam_graph = set()          # 아래->위
    
    def is_possible(x, y, t):
        if t == 0: # 기둥
            if y == 0: return True
            if (x-1, y) in beam_graph or (x, y) in beam_graph or (x, y-1) in pillar_graph: return True
        elif t == 1: # 보
            if (x, y-1) in pillar_graph or (x+1, y-1) in pillar_graph or \
            ((x-1, y) in beam_graph and (x+1, y) in beam_graph):
                # print(x, y, 'true')
                # print(pillar_graph, beam_graph)
                return True
        # if t==1: print(pillar_graph, beam_graph)
        return False
    
    # 쿼리 실행하기
    for x, y, a, b in build_frame:
        # print(x, y, a, b)
        # print('기둥:', pillar_graph)
        # print('보:', beam_graph)
        if a == 0: # 기둥(pillar)
            if b == 0: # 삭제
                pillar_graph.remove((x, y))
            elif b == 1: # 설치
                pillar_graph.add((x, y))
        elif a == 1: # 보(beam)
            if b == 0: # 삭제
                beam_graph.remove((x, y))
            elif b == 1: # 설치
                beam_graph.add((x, y))
        possible = True

        for r, c in pillar_graph:
            possible = is_possible(r, c, 0)

            if not possible:
                if a == 0: # 기둥

                    if b == 0: # 삭제
                        pillar_graph.add((x, y))
                    else:
                        pillar_graph.remove((x, y))
                else: # 보
                    if b == 0: # 삭제
                        beam_graph.add((x, y))
                    else:
                        beam_graph.remove((x, y))
                break
        if not possible: continue
        for r, c in beam_graph:
            possible = is_possible(r, c, 1)
            if not possible:
                if a == 0: # 기둥
                    if b == 0: # 삭제
                        pillar_graph.add((x, y))
                    else:
                        pillar_graph.remove((x, y))
                else: # 보
                    if b == 0: # 삭제
                        beam_graph.add((x, y))
                    else:
                        beam_graph.remove((x, y))
                break
                
    # print('최종 기둥:', pillar_graph)
    # print('최종 보:', beam_graph)
    # answer 배열 만들기
    
    for x, y in pillar_graph:
        answer.append([x, y, 0])
    for x, y in beam_graph:
        answer.append([x, y, 1])
    
    answer.sort()
    return answer


"""
모든 명령어를 수행한 후 구조물의 상태를 return

- 기둥은 바닥 위에 있거나 보의 한쪽 끝 부분 위에 있거나, 또는 다른 기둥 위에 있어야 합니다.
- 보는 한쪽 끝 부분이 기둥 위에 있거나, 또는 양쪽 끝 부분이 다른 보와 동시에 연결되어 있어야 합니다.

return 하는 배열의 원소는 [x, y, a] 형식입니다.
x, y는 기둥, 보의 교차점 좌표이며, [가로 좌표, 세로 좌표] 형태입니다.
기둥, 보는 교차점 좌표를 기준으로 오른쪽, 또는 위쪽 방향으로 설치되어 있음을 나타냅니다.
a는 구조물의 종류를 나타내며, 0은 기둥, 1은 보를 나타냅니다.

return 하는 배열은 x좌표 기준으로 오름차순 정렬하며, x좌표가 같을 경우 y좌표 기준으로 오름차순 정렬해주세요.
x, y좌표가 모두 같은 경우 기둥이 보보다 앞에 오면 됩니다.
"""