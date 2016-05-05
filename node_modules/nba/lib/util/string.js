"use strict";

function hasUnderscoreOrHyphen(str) {
  return str.indexOf("-") > -1 || str.indexOf("_") > -1;
}

// downcases the first letter in a string
// good for converting from PascalCase to camelCase
function downcaseFirst(str) {
  return str[0].toLowerCase() + str.slice(1);
}

// converts a dash or hypen separated string to camelCase
function unDashHyphen(str) {
  return str.trim().toLowerCase().replace(/[-_\s]+(.)?/g, function (match, c) {
    return c ? c.toUpperCase() : "";
  });
}

// checks if a string consists of only uppercase letters
function isAllUpperCase(str) {
  return str.split("").map(function (ch) {
    return ch.charCodeAt(0);
  }).every(function (n) {
    return n >= 65 && n <= 90;
  });
}

function jsify(str) {
  if (isAllUpperCase(str)) {
    return str.toLowerCase();
  }

  if (hasUnderscoreOrHyphen(str)) {
    return unDashHyphen(str);
  }

  return downcaseFirst(str);
}

function interpolate(_str) {
  return function (obj) {
    var str = _str;
    Object.keys(obj).forEach(function (key) {
      str = str.replace(new RegExp("__" + key + "__", "g"), obj[key]);
    });
    return str;
  };
}

module.exports = {
  hasUnderscoreOrHyphen: hasUnderscoreOrHyphen,
  downcaseFirst: downcaseFirst,
  unDashHyphen: unDashHyphen,
  isAllUpperCase: isAllUpperCase,
  jsify: jsify,
  interpolate: interpolate
};