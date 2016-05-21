import {Record} from 'immutable';
import Score from './Score';

const defaults = {
  status: "",
  url: "",
  nbaStatsFormattedStartDate: "",
  unixMillisecondsStartTime: 0,
  localizedStartDate: "",
  isUpcoming: false,
  arena: "",
  city: "",
  state: "",
  isPreviewAvailable: true,
  isRecapAvailable: true,
  periodValue: "",
  periodStatus: "",
  gameClock: "",
  broadcasts: [],
  visitorAbbreviation: "",
  visitorName: "",
  homeAbbreviation: "",
  homeName: "",
  periodScores: [],
  totalScore: new Score(),
}

export default class Scoreboard extends Record(defaults) {
  getBroadcasts() {
    return this.broadcasts.toString();
  }

  getFormattedLocation() {
    return `${this.arena}, ${this.city}, ${this.state}`;
  }

  getPeriodValues() {
    return this.periodScores.map(periodScore => periodScore.periodValue);
  }
};
