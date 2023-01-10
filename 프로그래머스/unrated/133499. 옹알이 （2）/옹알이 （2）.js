const wordsCanBabble = ["aya", "ye", "woo", "ma"];

function solution(babbling) {
    let count = 0;
    
    for (let i = 0; i < babbling.length; i++) {
        if (canPronounce(babbling[i])) {
            count++;
        }
    }
    
    return count;
}

const canPronounce = (word) => {
    let nowWord = word;
    let contain, double;
    
    for (let i = 0; i < wordsCanBabble.length; i++) {
        double = new RegExp(`(${wordsCanBabble[i]}){2,}`, 'g');
        if (double.test(nowWord)) return false;
        
        contain = new RegExp(`${wordsCanBabble[i]}`, 'g');
        nowWord = nowWord.replace(contain, '_');
    }
    
    if (/[a-z]/g.test(nowWord)) return false;
    return true;
}