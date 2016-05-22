import {Record} from 'immutable';
import GameBoxScoreLeaders from './GameBoxScoreLeaders';
import GameScores from './GameScores';
import GameMetadata from './GameMetadata';
import moment from 'moment-timezone';

const defaults = {
  metadata: new GameMetadata(),
  scores: new GameScores(),
  boxScoreLeaders: new GameBoxScoreLeaders(),
  playByPlay: [],
};

export default class GameData extends Record(defaults) {
  isUpcoming() {
    return this.metadata.unixMillisecondsStartTime > moment().valueOf();
  }
}