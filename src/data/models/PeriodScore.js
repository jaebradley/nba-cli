import {Record} from 'immutable';

const defaults = {
  periodValue: 1,
  homeScore: 0,
  visitorScore: 0,
}

export default class PeriodScore extends Record(defaults){

  getWinningTeam() {
    const scoreDifference = this.homeScore - this.visitorScore;
    if (scoreDifference == 0) {
      return 'TIE';
    }

    else if (scoreDifference < 0) {
      return 'VISITOR';
    }

    else {
      return 'HOME';
    }
  }

  static getFormattedScore(score, opponentScore) {
    const strValue = score.toString();
    if (score > opponentScore) {
      return strValue.green;

    } else if (score < opponentScore) {
      return strValue.red;
    }

    return strValue.blue;
  }

  getFormattedHomeScore() {
    return PeriodScore.getFormattedScore(this.homeScore, this.visitorScore);
  }

  getFormattedVisitorScore() {
    return PeriodScore.getFormattedScore(this.visitorScore, this.homeScore);
  }

  getFormattedPeriodName() {
    if (this.periodValue > 4) {
      return `OT${this.periodValue - 4}`;
      }

      return `Q${this.periodValue}`;
    }
};
