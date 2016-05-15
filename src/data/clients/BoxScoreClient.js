import rp from 'request-promise';

import Constants from '../../constants/Constants';
import BoxScoreDataTranslator from '../../translators/data/BoxScoreDataTranslator';

export default class BoxScoreClient {
  constructor() {
    this.boxScoreBaseUrl = 'http://data.nba.com/data/5s/json/cms/noseason/game/';
  }

  generateBoxScoreUrl(formattedGameDate, gameId) {
    return `${this.boxScoreBaseUrl}/${formattedGameDate}/${gameId}/boxscore.json`;
  }

  fetch(formattedGameDate, gameId, callback) {
    const boxScoreUrl = this.generateBoxScoreUrl(formattedGameDate, gameId);
    rp( { uri: boxScoreUrl, json: true } )
      .then(boxScoreData => callback(BoxScoreDataTranslator.translateBoxScoreData(boxScoreData)))
      .catch(err => console.log(err));
  }
}
