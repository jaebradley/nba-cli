import emoji from 'node-emoji';
import { Record } from 'immutable';

import Constants from '../constants/Constants';
import FormattedScore from './FormattedScore';
import Outcome from './Outcome';

const defaults = {
  home: 0,
  away: 0,
};

export default class Score extends Record(defaults) {
  getOutcome() {
    const scoreDifferential = this.home - this.away;

    if (scoreDifferential === 0) {
      return Outcome.TIE;
    } else if (scoreDifferential > 0) {
      return Outcome.HOME_WIN;
    }

    return Outcome.AWAY_WIN;
  }

  format() {
    const homeScore = this.home.toString();
    const awayScore = this.away.toString();

    if (this.home === Constants.ONE_HUNDRED) {
      return emoji.get(Constants.SCORE_100_EMOJI_VALUE);
    }

    switch (this.getOutcome()) {
      case Outcome.TIE:
        return new FormattedScore({
          home: homeScore.blue,
          away: awayScore.blue,
        });

      case Outcome.AWAY_WIN:
        return new FormattedScore({
          home: homeScore.red,
          away: awayScore.green,
        });

      case Outcome.HOME_WIN:
        return new FormattedScore({
          home: homeScore.green,
          away: awayScore.red,
        });

      default:
        throw new ReferenceError('unknown outcome value');
    }
  }
}
