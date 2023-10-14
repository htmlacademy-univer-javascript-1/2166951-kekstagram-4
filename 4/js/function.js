export const checkStringLength = (input, maxLength) => input.length <= maxLength;

export const isPalindrome = (input) => {
  const string = input.toLowerCase().replaceAll(' ', '');
  const reverseString = string.split('').reverse().join('');
  return string === reverseString;
};

export const extractNumbers = (input) => {
  const string = input.toString();
  let result = '';
  for (let i = 0; i < string.length; i++) {
    const char = string.at(i);
    if (!isNaN(parseInt(char, 10))) {
      result += char;
    }
  }
  return result ? +result : NaN;
};
