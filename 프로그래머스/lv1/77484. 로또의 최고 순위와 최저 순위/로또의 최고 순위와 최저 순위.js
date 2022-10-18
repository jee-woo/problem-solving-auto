function solution(lottos, win_nums) {
    let wins = 0, zeros = 0;
    for (let i = 0; i < win_nums.length; i++) {
        if (lottos[i] === 0) zeros++;
        if (lottos.includes(win_nums[i])) {
            wins++;
        }
    }
    
    return [wins === 0 && zeros === 0 ? 6 : 7 - wins - zeros, wins === 0 ? win_nums.length : 7 - wins]
}