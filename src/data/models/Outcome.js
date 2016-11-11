'use es6';

import {Enum} from 'enumify';

export default class Outcome extends Enum {};
Outcome.initEnum([
  'WIN',
  'LOSS',
  'TIE',
]);
