import { Record } from 'immutable';

import BroadcastMedium from './BroadcastMedium';

const defaults = {
  scope: '',
  name: '',
  medium: BroadcastMedium.TV,
};

export default class Broadcast extends Record(defaults) {}
