'use es6';

import {Record, List} from 'immutable';
import moment from 'moment-timezone';
import jstz from 'jstimezonedetect';

import GameStatus from './GameStatus';
import Location from './Location';
import Period from './Period';
import Broadcast from './Broadcast';
import BroadcastMedium from './BroadcastMedium';
import Matchup from './Matchup';
import Team from './Team';
import GameScoring from './GameScoring';
import Score from './Score';
import Constants from '../../constants/Constants';

let defaults = {
  id: '',
  status: GameStatus.FINAL,
  startTimestamp: 0,
  location: new Location(),
  period: new Period(0, '', ''),
  broadcasts: new List(),
  matchup: new Matchup(new Team(), new Team()),
  scoring: new GameScoring(List(), new Score(0, 0)),
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
