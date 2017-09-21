import { Record } from 'immutable';

const defaults = {
  arena: '',
  city: '',
  state: '',
};

export default class Location extends Record(defaults) {
  getFormattedLocation() {
    return `${this.arena}, ${this.city}, ${this.state}`;
  }
}
