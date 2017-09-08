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

    table.push(TeamBoxScoreLeadersTableCreator.getDataRow('Points', data.points));
    table.push(TeamBoxScoreLeadersTableCreator.getDataRow('Assists', data.assists));
    table.push(TeamBoxScoreLeadersTableCreator.getDataRow('Rebounds', data.rebounds));

    return table.toString();
  }

  static getDataRow(rowName, data) {
    return [
      rowName,
      data.value,
      data.getLeadersAbbreviatedNames(),
    ];
  }
}
