import NbaEmoji from 'nba-emoji';
import emoji from 'node-emoji';

import GameScore from '../../data/models/GameScore';
import Outcome from '../../data/models/Outcome';
import Constants from '../../constants/Constants';

export default class Formatter {
  constructor() {}

  static formatLiveGamePeriod(period) {
    if (parseInt(period) > 4) {
      return 'OT'.concat(period - 4);
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
    if (!(score instanceof GameScore)) {
      throw new TypeError('score should be a game score');
    }

    let scoreValue = score.score.toString();

    if (score.score === Constants.ONE_HUNDRED) {
      return emoji.get(Constants.SCORE_100_EMOJI_VALUE);
    }

    let outcome = score.getOutcome();
    switch (outcome) {
      case Outcome.TIE:
        return scoreValue.blue;

      case Outcome.LOSS:
        return scoreValue.red;

      case Outcome.WIN:
        return scoreValue.green;

      default:
        return scoreValue.red;
    }
  }
}
