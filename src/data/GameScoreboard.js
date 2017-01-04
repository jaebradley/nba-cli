'use es6';

import jstz from 'jstimezonedetect';
import moment from 'moment-timezone';
import {List, Record} from 'immutable';

import BroadcastMedium from './BroadcastMedium';
import Constants from '../constants/Constants';
import GameScoring from './GameScoring';
import GameStatus from './GameStatus';
import Location from './Location';
import Matchup from './Matchup';
import Period from './Period';

let defaults = {
  id: '',
  status: GameStatus.FINAL,
  startTimestamp: moment(),
  location: new Location(),
  period: new Period(),
  broadcasts: new List(),
  matchup: new Matchup(),
  scoring: new GameScoring(),
};

export default class GameScoreboard extends Record(defaults) {

  getNbaStatsFormattedStartDate() {
    return this.startTimestamp.clone().tz(Constants.DEFAULT_TIMEZONE)
                                      .format(Constants.DEFAULT_DATE_FORMAT);
  }

  getLocalizedStartDateTime() {
    return this.startTimestamp.clone().tz(jstz.determine().name())
                                      .format(Constants.TRANSLATED_DATE_FORMAT);
  }

  getTvBroadcastsString() {
    let tvBroadcasts = List();
    for (let broadcast of this.broadcasts) {
      if (broadcast.medium === BroadcastMedium.TV) {
        tvBroadcasts = tvBroadcasts.push(broadcast.name);
      }
    }
    return tvBroadcasts.toJS().toString();
  }

  isUpcoming() {
    return this.startTimestamp > moment().valueOf();
  }

  hasStarted() {
    return !this.isUpcoming() && this.status != Constants.PREGAME;
  }
}
