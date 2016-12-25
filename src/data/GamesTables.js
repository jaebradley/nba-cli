'use es6';

import {List, Record} from 'immutable';

let defaults = {
  active: List(),
  upcoming: undefined
};

export default class GamesTable extends Record(defaults) {
}
