function encode(strs) {
  let output = "";

  for (const str of strs) {
    const strLength = String(str.length).padStart(4, 0);
    output += strLength;
    output += str;
  }

  return output;
}

function decode(s) {
  let output = [];
  let currIdx = 0;

  while (currIdx < s.length) {
    const len = Number.parseInt(s.slice(currIdx, currIdx + 4));
    currIdx += 4;

    output.push(s.slice(currIdx, currIdx + len));
    currIdx += len;
  }

  return output;
}

// Variations
var encode1 = function (strs) {
  return strs.join(String.fromCharCode(257));
};

var decode1 = function (s) {
  return s.split(String.fromCharCode(257));
};
