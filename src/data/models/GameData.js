import {Record} from 'immutable';
import GameBoxScoreLeaders from './GameBoxScoreLeaders';
import Scoreboard from './Scoreboard';
import moment from 'moment-timezone';

const defaults = {
  scoreboard: new Scoreboard(),
  gameBoxScoreLeaders: new GameBoxScoreLeaders(),
  playByPlay: [],
};

export default class GameData extends Record(defaults) {
  isUpcoming() {
    return this.scoreboard.unixMillisecondsStartTime < moment().valueOf();
  }
}