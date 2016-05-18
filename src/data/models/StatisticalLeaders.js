import {Record} from 'immutable';

const defaults = {
  value: 0,
  leaders: []
};

export default class StatisticalLeaders extends Record(defaults) {

  getLeadersAbbreviatedNames() {
    return leaders.map(leader => leader.getAbbreviatedName()).toString();
  }
};
