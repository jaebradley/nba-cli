'use es6';

import {Record} from 'immutable';

import BroadcastMedium from './BroadcastMedium';

let defaults = {
  scope: '',
  name: '',
  medium: BroadcastMedium.TV,
};

export default class Broadcast extends Record(defaults) {
}
