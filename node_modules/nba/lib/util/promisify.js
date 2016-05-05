"use strict";

var pify = require("pify");

var promisify = function promisify(Prms) {
  return function (func) {
    return pify(func, Prms);
  };
};
var promisifyAll = function promisifyAll(Prms) {
  return function (obj) {
    return pify(obj, Prms);
  };
};

module.exports = { promisify: promisify, promisifyAll: promisifyAll };