import {Record} from 'immutable';
import emoji from 'node-emoji';
import Constants from '../../constants/Constants';
import Outcome from './Outcome';

const defaults = {
  homeTeam: 0,
  awayTeam: 0,
}

export default class GameScore extends Record(defaults){
  constructor(homeScore, visitorScore) {
    if (typeof homeScore !== 'number') {
      throw new TypeError('expected home score to be a number');
    }

    if (typeof visitorScore !== 'number') {
      throw new TypeError('expected visitor score to be a number');
    }

    if (homeScore < 0) {
      throw new RangeError('score cannot be negative');
    }

    if (visitorScore < 0) {
      throw new RangeError('score cannot be negative');
    }
  }

  getWinner() {
    let homeScoreDifferential = this.homeScore
  }

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
