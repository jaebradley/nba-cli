import { Record } from 'immutable';

const defaults = {
  value: 1,
  status: '',
  clock: '',
};

export default class Period extends Record(defaults) {}
