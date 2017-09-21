import jstz from 'jstimezonedetect';
import moment from 'moment-timezone';

import Constants from '../constants/Constants';
import GamesOption from '../data/GamesOption';

export default class StartOfDayIdentifier {
  static identify(value) {
    const gamesOption = GamesOption.enumValueOf(value);

    if (gamesOption) {
      return gamesOption.getStartOfDay();
    } else if (DateIdentifier.isValidDateString(value)) {
      return moment(value, Constants.INPUT_DATE_FORMAT, true).tz(jstz.determine().name()).startOf('day');
    }

    throw new Error(`Unable to identify date from value: ${value}`);
  }

  static isValidDateString(value) {
    return moment(value, Constants.INPUT_DATE_FORMAT, true).isValid();
  }
}
