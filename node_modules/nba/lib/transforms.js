"use strict";

var indexBy = require("lodash.indexby");

var collectify = require("./util/collectify");

var _require = require("./util/string");

var jsify = _require.jsify;
var downcaseFirst = _require.downcaseFirst;

function base(resp) {
  var data = resp.resultSets[0];
  var headers = data.headers.map(jsify);
  return collectify(headers, data.rowSet);
}

function general(resp) {
  return resp.resultSets.reduce(function (ret, set) {
    var name = downcaseFirst(set.name);
    ret[name] = collectify(set.headers.map(jsify), set.rowSet);
    return ret;
  }, {});
}

// todo make this work identical to update-players.js
function players(resp) {
  return base(resp).map(function (player) {
    var names = player.displayLastCommaFirst.split(", ").reverse();
    return {
      firstName: names[0].trim(),
      lastName: (names[1] ? names[1] : "").trim(),
      playerId: player.personId
    };
  });
}

function lineups(resp) {
  function makeLineup(lu) {
    delete lu.groupSet;
    lu.playerIds = lu.groupId.split(" - ").map(Number);
    return lu;
  }
  return general(resp).lineups.map(makeLineup);
}

function sportVu(resp) {
  var temp = general(resp);

  if (temp.length !== 1) {
    throw new Error("Expected sportVu response to have a single result set");
  }

  return indexBy(temp[0], "playerId");
}

module.exports = { base: base, general: general, players: players, lineups: lineups };