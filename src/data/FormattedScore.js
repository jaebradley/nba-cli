'use es6';

import {Record} from 'immutable';

let defaults = {
  home: '',
  away: '',
}

export default class FormattedScore extends Record(defaults){
}
