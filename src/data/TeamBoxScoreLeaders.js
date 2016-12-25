'use es6';

import {Record} from 'immutable';
import StatisticalLeaders from './StatisticalLeaders';

let defaults = {
  points : new StatisticalLeaders(),
  assists: new StatisticalLeaders(),
  rebounds: new StatisticalLeaders(),
};

export default class TeamBoxScoreLeaders extends Record(defaults) {
};
