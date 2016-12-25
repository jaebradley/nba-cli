'use es6';

import {Record} from 'immutable';

let defaults = {
  arena: '',
  city: '',
  state: '',
}

export default class Location extends Record(defaults) {
  getFormattedLocation() {
    return `${this.arena}, ${this.city}, ${this.state}`;
  }
}