"use strict";

var url = require("url");
var qs = require("querystring");

var getQs = function getQs(uri) {
  return uri.search[0] === "?" ? uri.search.slice(1) : uri.search;
};

module.exports = function stringToEndpoint(str) {
  var uri = url.parse(str);
  var params = qs.parse(getQs(uri));

  console.log("uri", uri.hostname + uri.pathname);
  console.log("params", params);
};