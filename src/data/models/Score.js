import {Record} from 'immutable';
import emoji from 'node-emoji';
import Constants from '../../constants/Constants';

const defaults = {
  homeScore: 0,
  visitorScore: 0,
}

export default class Score extends Record(defaults){
  getFormattedHomeScore() {
    return Score.formatScore(this.homeScore, this.visitorScore);
  }

  getFormattedVisitorScore() {
    return Score.formatScore(this.visitorScore, this.homeScore);
  }

  static calculateWinner(score, opponentScore) {
    const scoreDifference = score - opponentScore;
    if (scoreDifference == 0) {
      return 'TIE';
    }

    else if (scoreDifference < 0) {
      return 'OPPONENT';
    }

    else {
      return 'US';
    }
  }

  static formatScore(score, opponentScore) {
    if (score === Constants.ONE_HUNDRED) {
      return emoji.get(Constants.SCORE_100_EMOJI_VALUE);
    }

    const winner = Score.calculateWinner(score, opponentScore);
    const scoreString = score.toString();
    switch (winner) {
      case 'TIE':
        return scoreString.blue;

      case 'US':
        return scoreString.green;

      case 'OPPONENT':
        return scoreString.red;

      default:
        return scoreString.red;
    }
  }
};
