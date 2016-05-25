import rp from 'request-promise';
import Q from 'q';

import ScoreboardDataTranslator from '../../translators/data/ScoreboardDataTranslator';

export default class ScoreboardClient {
  constructor() {
    this.translator = new ScoreboardDataTranslator();
    this.baseScoreboardUrl = "http://data.nba.com/data/5s/json/cms/noseason/scoreboard";
  }

  generateScoreboardUrl(formattedGameDate) {
    return `${this.baseScoreboardUrl}/${formattedGameDate}/games.json`;
  }

  fetch(formattedGameDate) {
    const scoreboardUrl = this.generateScoreboardUrl(formattedGameDate);
    return rp( { uri: scoreboardUrl, json: true } )
      .then(scoreboardData => this.translator.translate(scoreboardData))
      .catch(err => console.log(err));
  }
}
