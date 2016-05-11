const NbaImages = require('nba-images');

const Constants = require('../../constants/Constants.js');

function formatGamePeriod(periodValue) {
  if (parseInt(periodValue) > 4) {
    return 'OT'.concat(periodValue - 4);
  }

  return 'Q'.concat(periodValue);
}

function formatScore(score, opponentScore) {
  const strValue = score.toString();
  if (score > opponentScore) {
    return strValue.green;
  } else if (score < opponentScore) {
    return strValue.red;
  }

  return strValue.blue;
};

module.exports = {
  
  formatGameSituation: function(status, period, clock) {
    if (status == Constants.LIVE) {
      return clock.concat(" ", formatGamePeriod(period));
    }

    return status;
  },

  formatTeamAbbreviation: function(abbreviation) {
    return abbreviation.concat(" ", NbaImages.getTeamEmoji(abbreviation));
  },

  formatTotalScore: function(score, opponentScore) {
    if (score == Constants.ONE_HUNDRED) {
      return emoji.get(Constants.SCORE_100_EMOJI_VALUE);
    }
    return formatScore(score, opponentScore).bold;
  },

  formatScore: function(score, opponentScore) {
    return formatScore(score, opponentScore);
  },

  formatGamePeriod: function(period) {
    return formatGamePeriod(period);
  },

  formatShortName: function(firstName, lastName) {
    return firstName.charAt(0).concat(".", lastName);
  },
};