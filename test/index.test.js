import imp, { Util as UtilImp, Range as RangeImp } from '../src/index';
const req = require('../src/index');
import Util from '../src/util';
import Range from '../src/range';

describe('Entrypoint', () => {
  it('should able to handle ES6 modules', () => {
    (imp === Util).should.equal(true);
    (UtilImp === Util).should.equal(true);
    (RangeImp === Range).should.equal(true);
  });

  it('should able to handle Common JS modules', () => {
    (req.Util === Util).should.equal(true);
    (req.Range === Range).should.equal(true);
  });
});
