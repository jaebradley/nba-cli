'use es6';

import {Record} from 'immutable';
import GameScores from './GameScores';
import GameMetadata from './GameMetadata';

const defaults = {
  gameMetadata: new GameMetadata(),
  gameScores: new GameScores(),
}

export default class TranslatedScoreboard extends Record(defaults) {
  
}