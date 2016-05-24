'use es6';

import {expect, assert} from 'chai';

import boxscore from './data/boxscore/final';

import BoxScoreDataTranslator from '../src/translators/data/BoxScoreDataTranslator';
import BoxScoreTableCreator from '../src/tables/BoxScoreTableCreator';
import GameBoxScoreLeaders from '../src/data/models/GameBoxScoreLeaders';
import TeamBoxScoreLeaders from '../src/data/models/TeamBoxScoreLeaders';
import StatisticalLeaders from '../src/data/models/StatisticalLeaders';
import Player from '../src/data/models/Player';

describe('Box score table creator', function() {
  const tableCreator = new BoxScoreTableCreator();
  const translatedBoxScore = BoxScoreDataTranslator.translateBoxScoreData(boxscore);

  const pointsLeaders = new StatisticalLeaders({
    value: 1,
    leaders:[new Player({firstName: 'Jae', lastName: 'Bradley'}), new Player({firstName: 'Steph', lastName: 'Curry'})],
  });
  const assistsLeaders = new StatisticalLeaders({
    value: 2,
    leaders:[new Player({firstName: 'Kobe', lastName: 'Bryant'})],
  });
  const reboundsLeaders = new StatisticalLeaders({
    value: 3,
    leaders:[new Player({firstName: 'Lebron', lastName: 'James'})],
  });
  const boxScoreLeaders = new TeamBoxScoreLeaders({
    points: pointsLeaders,
    assists: assistsLeaders,
    rebounds: reboundsLeaders,
  });
  const boxScore = new GameBoxScoreLeaders({
    home: boxScoreLeaders,
    visitor: boxScoreLeaders,
  });

  it('box score table creator constructor', function() {
    expect(tableCreator.defaultFormat).to.eql({ head: [ { content: 'Leaders', colSpan: 3} ] });
    expect(tableCreator.pointsHeader).to.eql('Points');
    expect(tableCreator.assistsHeader).to.eql('Assists');
    expect(tableCreator.reboundsHeader).to.eql('Rebounds');
  });

  it('test generate rows function', function() {
    const emptyRows = [
      ['Points', 0, ''],
      ['Assists', 0, ''],
      ['Rebounds', 0, ''],
    ];

    const filledRows = [
      ['Points', 1, 'J.Bradley,S.Curry'],
      ['Assists', 2, 'K.Bryant'],
      ['Rebounds', 3, 'L.James'],
    ];

    expect(tableCreator.generateRows(new GameBoxScoreLeaders().home)).to.eql(emptyRows);
    expect(tableCreator.generateRows(boxScore.home)).to.eql(filledRows);
  });
});