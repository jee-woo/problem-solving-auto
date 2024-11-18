// 2024.11.18

const fs = require('fs');
// const path = require('path');
// const filePath = path.join(__dirname, 'input.txt');
// const input = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [L, C] = input[0].split(' ').map(Number);

const letters = input[1].split(' ').sort();

const vowels = new Map();

['a', 'e', 'i', 'o', 'u'].forEach((v) => {
  vowels.set(v, true);
});
solution(letters);

function solution(arr) {
  const seqArr = [];
  const check = new Array(C).fill(false);

  const backtrack = (depth, seq, hasVowel, consonants) => {
    if (depth === L) {
      if (hasVowel && consonants >= 2) seqArr.push(seq.join(''));
      return;
    }

    for (let i = 0; i < arr.length; i++) {
      if (check[i]) continue;
      if (seq.length > 0 && seq[seq.length - 1] > arr[i]) continue;

      const isVowel = vowels.get(arr[i]);

      check[i] = true;
      backtrack(
        depth + 1,
        [...seq, arr[i]],
        hasVowel || isVowel,
        isVowel ? consonants : consonants + 1
      );
      check[i] = false;
    }
  };

  backtrack(0, [], false, 0);

  console.log(seqArr.join('\n'));
}
