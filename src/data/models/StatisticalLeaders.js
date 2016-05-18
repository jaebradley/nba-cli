import {Record} from 'immutable';

const defaults = {
  value: 0,
  leaders: [],
};

export default class StatisticalLeaders extends Record(defaults) {

  getLeadersAbbreviatedNames() {
    return this.leaders.map(leader => leader.getAbbreviatedName()).toString();
  }
};
