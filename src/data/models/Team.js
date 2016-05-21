'use es6';

import {Record} from 'immutable';

const defaults = {
  city: '',
  nickname: '',
  abbreviation: '',
};

export default class Team extends Record(defaults) {
  getName() {
    return `${this.city} ${this.nickname}`;
  }
}