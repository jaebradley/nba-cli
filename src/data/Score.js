'use es6';

import emoji from 'node-emoji';
import {Record} from 'immutable';

import Constants from '../constants/Constants';
import FormattedScore from './FormattedScore';
import Outcome from './Outcome';

let defaults = {
  home: 0,
  away: 0,
}

export default class Score extends Record(defaults){
  getOutcome() {
    let scoreDifferential = this.home - this.away;

    if (scoreDifferential == 0) {
      return Outcome.TIE;
    }

    else if (scoreDifferential > 0) {
      return Outcome.HOME_WIN;
    }

    return Outcome.AWAY_WIN;
  }

  format() {
    let homeScore = this.home.toString();
    let awayScore = this.away.toString();

    if (this.home === Constants.ONE_HUNDRED) {
      return emoji.get(Constants.SCORE_100_EMOJI_VALUE);
    }

    let outcome = this.getOutcome();
    switch (outcome) {
      case Outcome.TIE:
        return new FormattedScore({
          home: homeScore.blue,
          away: awayScore.blue
        });

      case Outcome.AWAY_WIN:
        return new FormattedScore({
          home: homeScore.red,
          away: awayScore.green
        });

      case Outcome.HOME_WIN:
        return new FormattedScore({
          home: homeScore.green,
          away: awayScore.red
        });

      default:
        throw new ReferenceError('unknown outcome value');
    }
  }
};
