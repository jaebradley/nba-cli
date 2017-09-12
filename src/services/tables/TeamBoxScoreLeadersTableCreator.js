import Table from 'cli-table2';

export default class TeamBoxScoreLeadersTableCreator {
  static create(data, isHome) {
    const table = new Table({
      head: [
        {
          content: `${isHome ? 'Home' : 'Away'} Leaders`,
          colSpan: 3,
          hAlign: 'center'
        }
      ]
    });

    table.push(TeamBoxScoreLeadersTableCreator.buildRow('Points', data.points));
    table.push(TeamBoxScoreLeadersTableCreator.buildRow('Assists', data.assists));
    table.push(TeamBoxScoreLeadersTableCreator.buildRow('Rebounds', data.rebounds));

    return table.toString();
  }

  static buildRow(rowName, data) {
    return [
      rowName,
      data.value,
      data.getLeadersAbbreviatedNames(),
    ];
  }
}
