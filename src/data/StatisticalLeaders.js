import {List, Record} from 'immutable';

let defaults = {
  value: 0,
  leaders: List(),
};

export default class StatisticalLeaders extends Record(defaults) {
  getLeadersAbbreviatedNames() {
    return List(this.leaders.map(leader => leader.getAbbreviatedName())).toJS().toString();
  }
};
