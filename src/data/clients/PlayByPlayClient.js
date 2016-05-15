import rp from 'request-promise';
import Q from 'q';

import PlayByPlayDataTranslator from '../../translators/data/PlayByPlayDataTranslator';

export default class PlayByPlayClient {
  constructor() {
    this.playByPlayDataTranslator = new PlayByPlayDataTranslator();
    this.basePlayByPlayUrl = "http://data.nba.com/data/5s/json/cms/noseason/game/";
  }

  generatePlayByPlayUrl(formattedGameDate, gameId) {
    return `${this.basePlayByPlayUrl}/${formattedGameDate}/${gameId}/pbp_all.json`;
  }

  fetch(formattedGameDate, gameId, callback) {
    const playByPlayUrl = this.generatePlayByPlayUrl(formattedGameDate, gameId);
    return rp( { uri: playByPlayUrl, json: true } )
      .then(playByPlayData => callback(this.playByPlayDataTranslator.translatePlayByPlayData(playByPlayData)))
      .catch(err => console.log(err));
  }
}
