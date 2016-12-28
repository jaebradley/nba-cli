'use es6';

import {expect} from 'chai';
import Team from '../src/data/Team';

describe('Team model', function() {
  it('creates team model', function() {
    let defaultTeam = new Team();
    let customTeam = new Team({
      city: 'city',
      nickname: 'nickname',
      abbreviation: 'abbreviation',
    });

    expect(defaultTeam.city).to.equal('');
    expect(defaultTeam.nickname).to.equal('');
    expect(defaultTeam.abbreviation).to.equal('');

    expect(customTeam.city).to.equal('city');
    expect(customTeam.nickname).to.equal('nickname');
    expect(customTeam.abbreviation).to.equal('abbreviation');
  });

  it('get formatted name', function() {
    let customTeam = new Team({
      city: 'city',
      nickname: 'nickname',
      abbreviation: 'abbreviation',
    });

    expect(customTeam.getName()).to.equal('city nickname');
  });

  it('get formatted team abbreviation', function() {
    let bostonCeltics = new Team({
      city: 'Boston',
      nickname: 'Celtics',
      abbreviation: 'BOS'
    });

    expect(bostonCeltics.getFormattedTeamAbbreviation()).to.eql('BOS 🍀');
  });
});
