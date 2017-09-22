import { Record } from 'immutable';
import Team from './Team';

const defaults = {
  homeTeam: new Team(),
  awayTeam: new Team(),
};

export default class Matchup extends Record(defaults) {}
