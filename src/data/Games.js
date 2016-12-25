'use es6';

import {List, Record} from 'immutable';

let defaults = {
  upcoming: List(),
  active: List()
};

export default class Games extends Record(defaults){
}
