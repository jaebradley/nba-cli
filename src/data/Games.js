import { List, Record } from 'immutable';

const defaults = {
  upcoming: List(),
  started: List(),
};

export default class Games extends Record(defaults) {}
