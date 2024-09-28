const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const noHeard = input.slice(1, N + 1);
const noSeen = input.slice(N + 1);

noHeard.sort();
noSeen.sort();

const noHeardSeen = [];

for (let h = 0, s = 0; h < noHeard.length && s < noSeen.length;) {
  if (noHeard[h] === noSeen[s]) {
    noHeardSeen.push(noHeard[h]);
    h++; s++; continue;
  }
  
  if (noHeard[h] > noSeen[s]) {
    s++;
  } else {
    h++;
  }
}

console.log(noHeardSeen.length)
noHeardSeen.forEach(name => console.log(name))
