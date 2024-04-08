/**
 * @param {string} compressedString
 */

// not solved yet

var StringIterator = function (compressedString) {
  this.data = compressedString.trim().split("");

  for (let j = 0; j < this.data.length; ) {
    if (Number.isInteger(+this.data[j])) {
      let charToDelete = 1;

      // n is a number
      let k = +this.data[j] - 1;

      this.data.splice(j, 1);

      while (k > 0) {
        this.data.splice(j, 0, this.data[j - 1]);
        k--;
      }
    } else {
      // character, we can move on
      j++;
    }
  }

  this.i = 0;
};

/**
 * @return {character}
 */
StringIterator.prototype.next = function () {
  const char = this.data[this.i] || "";
  this.i++;
  return char;
};

/**
 * @return {boolean}
 */
StringIterator.prototype.hasNext = function () {
  return !!this.data[this.i];
};

/**
 * Your StringIterator object will be instantiated and called as such:
 * var obj = new StringIterator(compressedString)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */
