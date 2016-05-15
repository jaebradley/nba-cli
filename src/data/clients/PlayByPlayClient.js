const rp = require('request-promise');
const Q = require('q');

const Constants = require('../../constants/Constants.js');
import PlayByPlayDataTranslator from '../../translators/data/PlayByPlayDataTranslator';

const playByPlayDataTranslator = new PlayByPlayDataTranslator();

function generatePlayByPlayUrl(formattedGameDate, gameId) {
  return Constants.BASE_NBA_DATA_PLAY_BY_PLAY_URL.concat(formattedGameDate, "/", gameId, "/pbp_all.json");
}

function fetchPlayByPlayData(playByPlayUrl, callback) {
  rp( { uri: playByPlayUrl, json: true } )
    .then(function (playByPlayData) {
      return playByPlayDataTranslator.translatePlayByPlayData(playByPlayData);
    })
    .then(function (translatedPlayByPlayData) {
      callback(translatedPlayByPlayData);
    })
    .catch(function (err) {
      console.log(err);
    });
}

module.exports = {
  fetchPlayByPlayData: function(formattedGameDate, gameId, callback) {
    const playByPlayUrl = generatePlayByPlayUrl(formattedGameDate, gameId);
    return fetchPlayByPlayData(playByPlayUrl, callback);
  }
};

