'use es6';

import {Record} from 'immutable';
import StatisticalLeaders from './StatisticalLeaders';

const defaults = {
  points : new StatisticalLeaders(),
  assists: new StatisticalLeaders(),
  rebounds: new StatisticalLeaders(),
};

export default class TeamBoxScoreLeaders extends Record(defaults) {
};
