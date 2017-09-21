import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import { List } from 'immutable';

chai.use(sinonChai);

const expect = chai.expect;

import CommandExecutionService from '../src/services/CommandExecutionService';
import Constants from '../src/constants/Constants';
import GamesOption from '../src/data/GamesOption';

describe('Tests Command Execution Service', () => {
  describe('Tests printing tables', () => {
    before(() => {
      sinon.spy(console, 'log');
    });

    it('Should print started games', () => {
      const tables = {
        started: List.of('foo', 'bar'),
        upcoming: 'upcoming',
      };

      CommandExecutionService.printTables(tables);

      expect(console.log).to.be.called;
      expect(console.log).to.have.been.calledThrice;
      expect(console.log).to.have.been.calledWith('foo');
      expect(console.log).to.have.been.calledWith('bar');
      expect(console.log).to.have.been.calledWith('upcoming');
    });
  });
});
