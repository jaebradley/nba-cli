'use es6';

import {Record, List} from 'immutable';

import GameStatus from './GameStatus';
import Location from './Location';
import Period from './Period';
import Broadcast from './Broadcast';
import Matchup from './Matchup';
import Team from './Team';
import GameScoring from './GameScoring';
import Score from './Score';

let defaults = {
  id: '',
  status: GameStatus.FINAL,
  startTimestamp: 0,
  location: new Location(),
  period: new Period(0, '', ''),
  broadcasts: new List(),
  matchup: new Matchup(new Team(), new Team()),
  scoring: new GameScoring([], new Score(0, 0)),
};

export default class GameScoreboard extends Record(defaults) {
  constructor(id, status, startTimestamp, location, period, broadcasts, matchup, scoring) {
    if (typeof id !== 'string') {
      throw new TypeError('id must be a string');
    }

    if (!(status instanceof GameStatus)) {
      throw new TypeError('status must be a game status');
    }

    if (typeof startTimestamp !== 'number') {
      throw new TypeError('start timestamp must be a number');
    }

    if (!(location instanceof Location)) {
      throw new TypeError('location must be a Location');
    }

    if (!(period instanceof Period)) {
      throw new TypeError('period must be a Period');
    }

    if (!(broadcasts instanceof List)) {
      throw new TypeError('broadcasts must be an array');
    }

    if (!(matchup instanceof Matchup)) {
      throw new TypeError('matchup must be a Matchup');
    }

    if (!(scoring instanceof GameScoring)) {
      throw new TypeError('scoring must be a GameScoring object');
    }

    super({
      id: id,
      status: status,
      startTimestamp: startTimestamp,
      location: location,
      period: period,
      broadcasts: broadcasts,
      matchup: matchup,
      scoring: scoring,
    });
  }
}
