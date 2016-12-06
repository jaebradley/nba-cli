'use es6';

import {List} from 'immutable';
import moment from 'moment-timezone';
import jstz from 'jstimezonedetect';

import ScoreboardGameTranslator from './ScoreboardGameTranslator';

export default class ScoreboardGamesTranslator {
  static translate(data) {
    if (!('sports_content' in data)) {
      throw new ReferenceError('sports content field missing');
    }

    if (!('games' in data.sports_content)) {
      throw new ReferenceError('games field missing');
    }

    if (!('game' in data.sports_content.games)) {
      throw new ReferenceError('game field missing');
    }

    let games = data.sports_content.games.game;

    let translatedGames = [];

    games.map(game => translatedGames.push(ScoreboardGameTranslator.translate(game)));

    return List.of(translatedGames);
  }
}
