import { Record } from 'immutable';

const defaults = {
  home: '',
  away: '',
};

export default class FormattedScore extends Record(defaults) {}
