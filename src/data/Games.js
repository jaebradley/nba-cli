'use es6';

import {List, Record} from 'immutable';

let defaults = {
  upcoming: List(),
  started: List()
};

export default class Games extends Record(defaults){
}
