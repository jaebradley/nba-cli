'use es6';

import emoji from 'node-emoji';
import {Record} from 'immutable';

import Constants from '../constants/Constants';
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
};
