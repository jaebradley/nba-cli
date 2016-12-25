'use es6';

import jstz from 'jstimezonedetect';
import moment from 'moment-timezone';
import {List, Record} from 'immutable';

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
    let userTimezone = jstz.determine().name();
    return moment(this.startTimestamp).tz(Constants.DEFAULT_TIMEZONE)
                                      .format(Constants.DEFAULT_DATE_FORMAT);
  }

  getLocalizedStartDateTime() {
    let userTimezone = jstz.determine().name();
    return moment(this.startTimestamp).tz(userTimezone)
                                      .format(Constants.TRANSLATED_DATE_FORMAT);
  }

  getTvBroadcastsString() {
    let tvBroadcasts = List();
    for (let i = 0; i < this.broadcasts.size; i++) {
      let broadcast = this.broadcasts.get(i);
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
