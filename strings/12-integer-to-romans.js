/**
 * @param {number} integer
 * @returns {string} str - roman numeral string
 */
function intToRoman(num, str = "") {
  let romans = [
    { sym: "M", value: 1000 },
    { sym: "CM", value: 900 },
    { sym: "D", value: 500 },
    { sym: "CD", value: 400 },
    { sym: "C", value: 100 },
    { sym: "XC", value: 90 },
    { sym: "L", value: 50 },
    { sym: "XL", value: 40 },
    { sym: "X", value: 10 },
    { sym: "IX", value: 9 },
    { sym: "V", value: 5 },
    { sym: "IV", value: 4 },
    { sym: "I", value: 1 },
  ];

  if (num > 0) {
    const { sym, value } = romans.find(({ value }) => num >= value);

    num = num - value;
    str += sym;

    return intToRoman(num, str);
  }

  return str;
}
