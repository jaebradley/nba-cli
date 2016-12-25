'use es6';

import {Record} from 'immutable';
import NbaEmoji from 'nba-emoji';

let defaults = {
  city: '',
  nickname: '',
  abbreviation: '',
};

export default class Team extends Record(defaults) {
  getName() {
    return `${this.city} ${this.nickname}`;
  }

  getFormattedTeamAbbreviation() {
    return `${this.abbreviation} ${NbaEmoji.getEmoji(this.abbreviation)}`;
  }
}
