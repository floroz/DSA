// The standard solution using a map:

var isAnagram = function (s, t) {
  if (t.length !== s.length) return false;
  const counts = {};
  for (let c of s) {
    counts[c] = (counts[c] || 0) + 1;
  }
  for (let c of t) {
    if (!counts[c]) return false;
    counts[c]--;
  }
  return Object.values(counts).every((v) => v === 0);
};
// ...which can be "minified" to:

// One-liner (log n times slower) using sort:

var isAnagram = function (s, t) {
  return s.split("").sort().join("") === t.split("").sort().join("");
};
