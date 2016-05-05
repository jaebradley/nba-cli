"use strict";

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var stats = require("./stats");

module.exports = function (cb) {
  stats.playersInfo(function (err, resp) {
    if (err) return cb(err);
    var players = resp.resultSets[0].rowSet;
    cb(null, players.map(makePlayer));
  });
};

function makePlayer(tuple) {
  var playerId = tuple[0];

  var _tuple$1$split = tuple[1].split(", ");

  var _tuple$1$split2 = _slicedToArray(_tuple$1$split, 2);

  var lastName = _tuple$1$split2[0];
  var firstName = _tuple$1$split2[1];

  var teamId = tuple[7];
  return { firstName: firstName, lastName: lastName, playerId: playerId, teamId: teamId };
}