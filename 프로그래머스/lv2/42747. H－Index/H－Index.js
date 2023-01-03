function solution(citations) {
    let hIndex = 0;
    let sortedCitations = citations.slice().sort((a, b) => b - a);
    for (let i = 0; i < sortedCitations.length; i++) {
        if (sortedCitations[i] >= i + 1 &&
            sortedCitations[i] >= sortedCitations.length - i) {
            hIndex++;
        } else {
            break;
        }
    }
    return hIndex;
}