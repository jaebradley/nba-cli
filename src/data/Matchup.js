'use es6';

import {Record} from 'immutable';
import Team from './Team';

let defaults = {
  homeTeam: new Team(),
  awayTeam: new Team(),
};

export default class Matchup extends Record(defaults) {
}
