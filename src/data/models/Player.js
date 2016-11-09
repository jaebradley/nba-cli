import {Record} from 'immutable';

export default class Player extends Record {
  constructor(firstName, lastName) {
    if (typeof firstName !== "string") {
      throw new Error("player first name is not a string");
    }

    if (typeof lastName !== "string") {
      throw new Error("player last name is not a string");
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
