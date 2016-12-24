'use es6';

import Table from 'cli-table2';

import {List, Record} from 'immutable';

let defaults = {
  active: List(),
  upcoming: new Table()
};

export default class GamesTable extends Record(defaults) {
}
