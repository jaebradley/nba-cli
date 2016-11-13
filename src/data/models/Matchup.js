'use es6';

import {Record} from 'immutable';
import Team from './Team';

let defaults = {
  homeTeam: new Team(),
  awayTeam: new Team(),
};

export default class Matchup extends Record(defaults) {
  constructor(homeTeam, awayTeam) {
    if (!(homeTeam instanceof Team)) {
      throw new TypeError('home team must be a Team object');
    }

    if (!(awayTeam instanceof Team)) {
      throw new TypeError('away team must be a Team object');
    }

    super({
      homeTeam: homeTeam,
      awayTeam: awayTeam,
    });
  }
}
