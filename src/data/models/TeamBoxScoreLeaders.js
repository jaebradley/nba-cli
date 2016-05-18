import {Record} from 'immutable';
import StatisticalLeaders from './StatisticalLeaders';

const defaults = {
  points : new StatisticalLeaders(),
  assists: new StatisticalLeaders(),
  rebounds: new StatisticalLeaders(),
};

export default class BoxScoreLeaders extends Record(defaults) {
};
