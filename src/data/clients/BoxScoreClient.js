const rp = require('request-promise');

const Constants = require('../../constants/Constants.js');
const BoxScoreDataTranslator = require('../../translators/data/BoxScoreDataTranslator.js');

function generateBoxScoreUrl(formattedGameDate, gameId) {
  return Constants.BASE_NBA_DATA_PLAY_BY_PLAY_URL.concat(formattedGameDate, "/", gameId, "/boxscore.json");
}

function fetchBoxScoreData(boxScoreUrl, callback) {
  rp( { uri: boxScoreUrl, json: true } )
    .then(function (boxScoreData) {
      return BoxScoreDataTranslator.translateBoxScoreData(boxScoreData);
    })
    .then(function (translatedBoxScoreData) {
      callback(translatedBoxScoreData);
    })
    .catch(function (err) {
      console.log(err);
    });
}

module.exports = {
  fetchBoxScoreData: function(formattedGameDate, gameId, callback) {
    const boxScoreUrl = generateBoxScoreUrl(formattedGameDate, gameId);
    return fetchBoxScoreData(boxScoreUrl, callback);
  }
};

