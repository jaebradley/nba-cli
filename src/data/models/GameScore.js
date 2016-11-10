import {Record} from 'immutable';
import emoji from 'node-emoji';
import Constants from '../../constants/Constants';
import Outcome from './Outcome';

const defaults = {
  homeTeam: 0,
  awayTeam: 0,
}

export default class GameScore extends Record(defaults){
  constructor(homeTeam, awayTeam) {
    if (typeof homeTeam !== 'number') {
      throw new TypeError('expected home score to be a number');
    }

    if (typeof awayTeam !== 'number') {
      throw new TypeError('expected visitor score to be a number');
    }

    if (homeTeam < 0) {
      throw new RangeError('score cannot be negative');
    }

    if (awayTeam < 0) {
      throw new RangeError('score cannot be negative');
    }

    super({
      homeTeam: homeTeam,
      awayTeam: awayTeam
    });
  }

  getOutcome() {
    let homeTeamDifferential = this.homeTeam - this.awayTeam;

    if (homeTeamDifferential == 0) {
      return Outcome.TIE;
    }

    else if (homeTeamDifferential < 0) {
      return Outcome.HOME_WIN;
    }

    return Outcome.AWAY_WIN;
  }
};
