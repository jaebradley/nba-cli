import rp from 'request-promise';
import Q from 'q';

import ScoreboardDataTranslator from '../../translators/data/ScoreboardDataTranslator';

export default class ScoreboardClient {
  constructor() {
    this.scoreboardDataTranslator = new ScoreboardDataTranslator();
    this.baseScoreboardUrl = "http://data.nba.com/data/5s/json/cms/noseason/scoreboard/";
  }

  generateScoreboardUrl(formattedGameDate) {
    return `${this.baseScoreboardUrl}/${formattedGameDate}/games.json`;
  }

  fetch(formattedGameDate, callback) {
    const scoreboardUrl = this.generateScoreboardUrl(formattedGameDate);
    return rp( { uri: scoreboardUrl, json: true } )
      .then(scoreboardData => callback(this.scoreboardDataTranslator.translateScoreboardData(scoreboardData)))
      .catch(err => console.log(err));
  }
}
