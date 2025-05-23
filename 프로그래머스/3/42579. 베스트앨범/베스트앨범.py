def solution(genres, plays):
    answer = []
    n = len(genres)
    
    genre_dict = dict()
    # songs = dict()
    
    for i in range(n):
        genre = genres[i]
        play = plays[i]
        if genre in genre_dict:
            genre_dict[genre][0].append((i, play))
            genre_dict[genre][1] += play
        else:
            genre_dict[genre] = [[(i, play)], play, genre]

    genre_list = list(genre_dict.values())
    genre_list.sort(key=lambda x: -x[1])
    
    for g in genre_list:
        songs, now_play, now_genre = g

        songs.sort(key=lambda x: -x[1])
        for i in range(min(2, len(songs))):
            answer.append(songs[i][0])
    
    return answer

"""
장르 별로 가장 많이 재생된 노래를 두 개씩 모아 베스트 앨범을 출시

1. 장르 순서 정하기
2. 장르 내 노래 재생 횟수로 순서 정하기

"""