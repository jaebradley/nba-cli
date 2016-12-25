'use es6';

import {Record} from 'immutable';
import GameScores from './GameScores';
import GameMetadata from './GameMetadata';

const defaults = {
  metadata: new GameMetadata(),
  scores: new GameScores(),
}

export default class TranslatedScoreboard extends Record(defaults) {
  
}