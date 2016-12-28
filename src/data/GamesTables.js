'use es6';

import {List, Record} from 'immutable';

let defaults = {
  started: List(),
  upcoming: undefined
};

export default class GamesTable extends Record(defaults) {
}
