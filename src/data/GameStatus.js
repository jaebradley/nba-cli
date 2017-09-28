import { Enum } from 'enumify';

export default class GameStatus extends Enum {}

GameStatus.initEnum([
  'PREGAME',
  'LIVE',
  'HALFTIME',
  'FINAL',
]);
