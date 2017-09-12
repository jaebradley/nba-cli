import TeamBoxScoreLeadersTableCreator from './TeamBoxScoreLeadersTableCreator';

export default class HomeTeamBoxScoreLeadersTableCreator extends TeamBoxScoreLeadersTableCreator {
  static getTeamType() {
    return 'Home';
  }
}
