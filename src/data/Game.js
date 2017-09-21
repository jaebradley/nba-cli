import { List, Record } from 'immutable';

const defaults = {
  metadata: undefined,
  boxScoreLeaders: List(),
  plays: List(),
};

export default class Game extends Record(defaults) {}
