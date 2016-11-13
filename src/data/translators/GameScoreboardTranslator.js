'use es6';

import {Record} from 'immutable';

import HtmlEscaper from '../../utils/HtmlEscaper';

export default class GameScoreboardTranslator {
  static translate(data) {
    if (!('sports_content' in data)) {
      throw new Error('sports_content not in data');
    }

    if (!('game' in data.sports_content)) {
      throw new Error('game not in data');
    }

    let gameData = data.sports_content.game;
  }

  static getGameStatus(gameData) {
    
  }
}
