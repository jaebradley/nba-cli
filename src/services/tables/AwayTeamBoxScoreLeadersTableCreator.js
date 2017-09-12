import TeamBoxScoreLeadersTableCreator from './TeamBoxScoreLeadersTableCreator';

export default class AwayTeamBoxScoreLeadersTableCreator extends TeamBoxScoreLeadersTableCreator {
  static getTeamType() {
    return 'Away';
  }
}
