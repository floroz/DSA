/**
 * @param {string[]} equations
 * @return {boolean}
 */
var equationsPossible = function (equations) {
  let parent = new Map();

  const find = (node) => {
    parent.set(node, parent.get(node) || node);
    return parent.get(node) === node ? node : find(parent.get(node));
  };

  equations.forEach(([node1, sign, , node2]) => {
    if (sign === "=") {
      parent.set(find(node1), find(node2));
    }
  });

  for (let [a, s, , b] of equations) {
    if (s === "!") {
      if (find(a) === find(b)) return false;
    }
  }

  return true;
};

test("equationsPossible", () => {
  expect(equationsPossible(["a==b", "b!=a"])).toBeFalsy();
  expect(equationsPossible(["b==a", "a==b"])).toBeTruthy();
  expect(equationsPossible(["a==b", "b==c", "a==c"])).toBeTruthy();
});
