'use es6';

import {Record} from 'immutable';

import BroadcastMedium from 'BroadcastMedium';

let defaults = {
  scope: '',
  name: '',
  medium: BroadcastMedium.TV,
};

export default class Broadcast extends Record(defaults) {
  constructor(scope, name, medium) {
    if (typeof scope !== 'string') {
      throw new TypeError('Broadcast scope must be a string');
    }

    if (typeof name !== 'string') {
      throw new TypeError('Broadcast name must be a string');
    }

    if (!(medium instanceof BroadcastMedium)) {
      throw new TypeError('medium must be a broadcast medium');
    }

    super({
      scope: scope,
      name: name,
      medium: medium,
    });
  }
}
