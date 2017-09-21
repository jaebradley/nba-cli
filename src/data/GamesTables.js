import { List, Record } from 'immutable';

const defaults = {
  started: List(),
  upcoming: undefined,
};

export default class GamesTable extends Record(defaults) {}
