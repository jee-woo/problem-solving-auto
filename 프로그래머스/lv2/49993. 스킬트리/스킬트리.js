function solution(skill, skill_trees) {
  let possible = 0;

  let skillMap = new Map();

  skill.split("").map((val, idx) => {
    skillMap.set(val, idx);
  });

  let step;
  const isPossible = (tree) => {

    let now = -1; // C: 0, B: 1, D: 2
    for (let val of tree) {
      step = skillMap.get(val);
      if (step !== undefined) {
        if (step === now + 1) now++;
        else return false;
      }
    }
    return true;
  };

  skill_trees.map((tree) => {
    if (isPossible(tree)) possible++;
  });

  return possible;
}
