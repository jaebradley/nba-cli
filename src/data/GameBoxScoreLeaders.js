'use es6';

import {Record} from 'immutable';
import TeamBoxScoreLeaders from './TeamBoxScoreLeaders';

const defaults = {
  home: new TeamBoxScoreLeaders(),
  visitor: new TeamBoxScoreLeaders(),
};

export default class GameBoxScoreLeaders extends Record(defaults) {
};
