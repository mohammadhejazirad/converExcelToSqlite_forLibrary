const {
  isPersian,
  hasPersian,
  toPersianChars,
} = require("@persian-tools/persian-tools");

const isPersianText = (text) => {
  return isPersian(text);
};

const convertToPersianChars = (text) => {
  return toPersianChars(text);
};

module.exports = {
  isPersianText,
  convertToPersianChars,
};
