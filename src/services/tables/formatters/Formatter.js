import NbaEmoji from 'nba-emoji';
import emoji from 'node-emoji';

import Outcome from '../../../data/Outcome';
import Constants from '../../../constants/Constants';
import Score from '../../../data/Score';

export default class Formatter {

  static formatLiveGamePeriod(period) {
    let value = parseInt(period) - 4;
    if (value > 0) {
      return 'OT'.concat(value);
    }

    return 'Q'.concat(period);
  }

  static formatScore(score, opponentScore) {
    const strValue = score.toString();
    if (score > opponentScore) {
      return strValue.green;

    } else if (score < opponentScore) {
      return strValue.red;
    }

    return strValue.blue;
  }

  static formatGameSituation(status, period, clock) {
    if (status == Constants.LIVE) {
      const formattedLiveGamePeriod = Formatter.formatLiveGamePeriod(period);
      return `${clock} ${formattedLiveGamePeriod}`;
    }

    return status;
  }

  static formatTeamAbbreviation(abbreviation) {
    const teamEmoji = NbaEmoji.getEmoji(abbreviation);
    return `${abbreviation} ${teamEmoji}`;
  }

  static formatTotalScore(score, opponentScore) {
    if (score == Constants.ONE_HUNDRED) {
      return emoji.get(Constants.SCORE_100_EMOJI_VALUE);
    }
    return Formatter.formatScore(score, opponentScore).bold;
  }

  static formatShortPlayerName(firstName, lastName) {
    const firstCharacter = firstName.charAt(0);
    return `${firstCharacter}. ${lastName}`;
  }

  static formatScore(score) {
    if (!(score instanceof Score)) {
      throw new TypeError('score should be a Score object');
    }

    let scoreValue = score.home.toString();

    if (score.home === Constants.ONE_HUNDRED) {
      return emoji.get(Constants.SCORE_100_EMOJI_VALUE);
    }

    let outcome = score.getOutcome();
    switch (outcome) {
      case Outcome.TIE:
        return scoreValue.blue;

      case Outcome.AWAY_WIN:
        return scoreValue.red;

      case Outcome.HOME_WIN:
        return scoreValue.green;

      default:
        return scoreValue.red;
    }
  }

  static formatPeriodValue(periodValue) {
    if (typeof periodValue !== 'number' ) {
      throw new TypeError('expected numerical period value');
    }

    if (periodValue < 0) {
      throw new RangeError('expected non-negative period value');
    }

    return periodValue > 4 ? `OT${periodValue - 4}` : `Q${periodValue}`;
  }
}
