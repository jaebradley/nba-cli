'use es6';

import {Enum} from 'enumify';

export default class BroadcastMedium extends Enum {};

BroadcastMedium.initEnum({
  RADIO,
  TV,
});
