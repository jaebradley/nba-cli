import {Record} from 'immutable';
import TeamBoxScoreLeaders from './TeamBoxScoreLeaders';

const defaults = {
  home : new TeamBoxScoreLeaders(),
  away: new TeamBoxScoreLeaders(),
};

export default class GameBoxScoreLeaders extends Record(defaults) {
};
