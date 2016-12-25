'use es6';

import {Record} from 'immutable';

let defaults = {
  firstName: '',
  lastName: ''
};

export default class Player extends Record(defaults) {
  getAbbreviatedFirstName() {
    if (this.firstName.length > 0) {
      return this.firstName.charAt(0);
    }

    return this.firstName;
  }

  getAbbreviatedName() {
    return `${this.getAbbreviatedFirstName()}.${this.lastName}`;
  }
};
