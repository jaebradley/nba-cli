import {Record} from 'immutable';
import GameBoxScoreLeaders from './GameBoxScoreLeaders';
import GameScores from './GameScores';
import GameMetadata from './GameMetadata';

const defaults = {
  metadata: new GameMetadata(),
  scores: new GameScores(),
  boxScoreLeaders: new GameBoxScoreLeaders(),
  playByPlay: [],
};

export default class GameData extends Record(defaults) {
}