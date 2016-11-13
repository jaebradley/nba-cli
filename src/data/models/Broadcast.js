'use es6';

import {Record} from 'immutable';

let defaults = {
  scope: '',
  name: '',
};

export default class Broadcast extends Record(defaults) {
  constructor(scope, name) {
    if (typeof scope !== 'string') {
      throw new TypeError('Broadcast scope must be a string');
    }

    if (typeof name !== 'string') {
      throw new TypeError('Broadcast name must be a string');
    }

    super({
      scope: scope,
      name: name,
    });
  }
}
