function solution(cacheSize, cities) {
    // 캐시를 queue로 구현.
    // 최근 참조한 것 -> 오래된 것 순으로 배치
    // ["asd", "Asd", "dsf"] (cacheSize === 3일 때)
    // 앞에서부터 넣고 (unshift), 뒤에서부터 제거(pop)
    // cache hit : queue에 있는 경우 => 실행시간 += 1
    // cache miss : queue에 없는 경우 => 실행시간 += 5
    
    if (cacheSize === 0) return cities.length * 5; // cache 사용 X
    
    let time = 0;
    let cache = new Array(cacheSize).fill(""); // cacheSize만큼 cache 배열 선언
    
    for (let i = 0; i < cities.length; i++) {
        if (cache.includes(cities[i].toLowerCase())) {
            cache.splice(cache.indexOf(cities[i].toLowerCase()), 1);
            time += 1;
        } else {
            cache.splice(-1);
            time += 5;
        }
        cache.unshift(cities[i].toLowerCase());
    }
    
    return time;
}