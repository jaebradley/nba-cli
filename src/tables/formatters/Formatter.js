import NbaImages from 'nba-images';

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
    const teamEmoji = NbaImages.getTeamEmoji(abbreviation);
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
}