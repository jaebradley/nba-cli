'use es6';

import {List} from 'immutable';
import moment from 'moment-timezone';
import jstz from 'jstimezonedetect';

import HtmlEscaper from '../../utils/HtmlEscaper';
import GameStatus from '../models/GameStatus';
import Constants from '../../constants/Constants';
import Location from '../models/Location';
import Period from '../models/Period';
import Broadcast from '../models/Broadcast';
import BroadcastMedium from '../models/BroadcastMedium';

export default class GameScoreboardTranslator {
  static translate(data) {
    if (!('sports_content' in data)) {
      throw new ReferenceError('sports_content field missing');
    }

    if (!('game' in data.sports_content)) {
      throw new ReferenceError('game field missing');
    }

    if (!('period_time' in data.sports_content.game)) {
      throw new ReferenceError('period_time field missing');
    }

    if (!('broadcasters' in data.sports_content.game)) {
      throw new ReferenceError('broadcasters field missing');
    }

    let gameData = data.sports_content.game;
    let periodTime = gameData.period_time;
    let broadcasters = gameData.broadcasters;
  }

  static getGameStatus(periodTime) {
    if (!('game_status') in periodTime) {
      throw new ReferenceError('game_status field not in data');
    }

    return GameStatus.from(periodTime.game_status);
  }

  static getStartTimestamp(gameData) {
    if (!('date' in gameData)) {
      throw new ReferenceError('date field missing');
    }

    if (!('time' in gameData)) {
      throw new ReferenceError('time field missing');
    }

    let rawStartTime = `${gameData.date}${gameData.time}`;

    return moment(dateStartTime, Constants.TRANSLATED_NBA_DATE_TIME_FORMAT)
            .tz(Constants.DEFAULT_TIMEZONE)
            .clone()
            .tz("UTC")
            .valueOf();
  }

  static getLocation(gameData) {
    if (!('arena' in gameData)) {
      throw new ReferenceError('arena field missing');
    }

    if (!('city' in gameData)) {
      throw new ReferenceError('city field missing');
    }

    if (!('state' in gameData)) {
      throw new ReferenceError('state field missing');
    }

    return new Location({
      arena: gameData.arena,
      city: gameData.city,
      state: gameData.state,
    });
  }

  static getPeriod(periodTime) {
    if (!('period_status' in periodTime)) {
      throw new ReferenceError('period_status field missing');
    }

    if (!('period_value' in periodTime)) {
      throw new ReferenceError('period_value field missing');
    }

    if (!('game_clock' in periodTime)) {
      throw new ReferenceError('game_clock field missing');
    }

    return new Period(parseInt(periodTime.period_value),
                      periodTime.period_status,
                      periodTime.game_clock);
  }

  static getBroadcasts(broadcasters) {
    if (!('radio' in broadcasters)) {
      throw new ReferenceError('radio field missing');
    }

    if (!('tv' in broadcasters)) {
      throw new ReferenceError('tv field missing');
    }

    if (!('broadcaster' in broadcasters.radio)) {
      throw new ReferenceError('radio broadcasters field missing');
    }

    if (!('broadcaster' in broadcasters.tv)) {
      throw new ReferenceError('tv broadcasters field missing');
    }

    let broadcasts = [];
    let radioBroadcasters = broadcasters.radio.broadcaster;
    let tvBroadcasters = broadcasters.tv.broadcaster;

    radioBroadcasters.map(broadcast =>
                          broadcasts.push(GameScoreboardTranslator
                                            .getBroadcast(broadcast,
                                                          BroadcastMedium.RADIO)));

    tvBroadcasters.map(broadcast =>
                       broadcasts.push(GameScoreboardTranslator
                                        .getBroadcast(broadcast,
                                                      BroadcastMedium.TV)));                                                                                BroadcastMedium.RADIO)));

    return List.of(broadcasts);
  }

  static getBroadcast(broadcast, medium) {
    if (!('scope' in broadcast)) {
      throw new ReferenceError('broadcast scope field missing');
    }

    if (!('display_name' in broadcast)) {
      throw new ReferenceError('broadcast display name field missing');
    }

    if (!(medium instanceof BroadcastMedium)) {
      throw new TypeError('medium must be a BroadcastMedium');
    }

    return new Broadcast(broadcast.scope, broadcast.display_name, medium);
  }
}
