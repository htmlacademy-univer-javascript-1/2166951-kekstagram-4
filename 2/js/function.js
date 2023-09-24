function checkStringLength(input, maxLength) {
  return input.length <= maxLength;
}

function isPalindrome(input) {
  const string = input.toLowerCase().replaceAll(' ', '');
  const reverseString = string.split('').reverse().join('');
  return string === reverseString;
}

function extractNumbers(input) {
  const string = input.toString();
  let result = '';
  for (let i = 0; i < string.length; i++) {
    const char = string.at(i);
    if (!isNaN(parseInt(char, 10))) {
      result += char;
    }
  }
  return result ? +result : NaN;
}

checkStringLength('something', 5);
isPalindrome('dotaatod');
extractNumbers('12 abd 0.5');
