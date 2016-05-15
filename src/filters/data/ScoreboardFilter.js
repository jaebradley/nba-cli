export default class ScoredboardFilter {
  constructor() {}

  static filter(data, unixMillisecondsStartTime, unixMillisecondsEndTime) {
    const filteredData = {};
    for (let gameId in data) {
      const gameUnixMilliseconds = data[gameId].unixMillisecondsStartTime;
      if (unixMillisecondsStartTime <= gameUnixMilliseconds && unixMillisecondsEndTime >= gameUnixMilliseconds) {
        filteredData[gameId] = data[gameId];
      }
    }
    return filteredData;
  }
}
