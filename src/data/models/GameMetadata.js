'use es6';

import {Record} from 'immutable';

import moment from 'moment-timezone';
import jstz from 'jstimezonedetect';

import Team from '../../data/models/Team';
import Location from '../../data/models/Location';
import Constants from '../../constants/Constants';

const defaults = {
  id: 0,
  status: "",
  url: "",
  unixMillisecondsStartTime: 0,
  location: new Location(),
  isPreviewAvailable: true,
  isRecapAvailable: true,
  periodValue: "",
  periodStatus: "",
  gameClock: "",
  broadcasts: [],
  visitor: new Team(),
  home: new Team(),
};

export default class GameMetadata extends Record(defaults) {
  getNbaStatsFormattedStartDate() {
    const userTimezone = jstz.determine().name();
    return moment(this.unixMillisecondsStartTime).tz(Constants.DEFAULT_TIMEZONE)
              .format(Constants.DEFAULT_DATE_FORMAT);
  }

  getLocalizedStartDateTime() {
    const userTimezone = jstz.determine().name();
    return moment(this.unixMillisecondsStartTime).tz(userTimezone)
            .format(Constants.TRANSLATED_DATE_FORMAT);
  }

  getBroadcastsString() {
    return this.broadcasts.toString();
  }
};