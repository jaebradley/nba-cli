module.exports = {
  filterScoreboardData: function(data, unixMillisecondsStartTime, unixMillisecondsEndTime) {
    const filteredData = {};
    for (var gameId in data) {
      const gameUnixMilliseconds = data[gameId].unixMillisecondsStartTime;
      if (unixMillisecondsStartTime <= gameUnixMilliseconds && unixMillisecondsEndTime >= gameUnixMilliseconds) {
        filteredData[gameId] = data[gameId];
      }
    }
    return filteredData;
  }
};