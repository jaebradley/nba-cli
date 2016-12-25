import {Record} from 'immutable';

let defaults = {
  firstName: '',
  lastName: ''
};

export default class Player extends Record(defaults) {
  constructor(firstName, lastName) {
    if (typeof firstName !== "string") {
      throw new TypeError("player first name is not a string");
    }

    if (typeof lastName !== "string") {
      throw new TypeError("player last name is not a string");
    }

    super({
      firstName: firstName,
      lastName: lastName
    });
  }

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
