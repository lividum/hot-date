import Range from '../src/range';
import Util from '../src/util';
import moment from 'moment-timezone';

describe('Range Library', () => {
  it('able to create basic range', () => {
    let list;

    const start = '2016-01-01';
    const end = '2016-02-01';
    const format = 'YYYY-MM-DD';

    const range = new Range(start, end);

    list = range.interval().toArray();
    list.length.should.equal(32);
    list[0].toMoment().format(format).should.be.equal(start);
    list[list.length - 1].toMoment().format(format).should.be.equal(end);

    list = range.interval('M').toArray();
    list.length.should.equal(2);
    list[0].toMoment().format(format).should.be.equal(start);
    list[list.length - 1].toMoment().format(format).should.be.equal(end);

    list = range.interval('Y').toArray();
    list.length.should.equal(1);
    list[0].toMoment().format(format).should.be.equal(start);

    list = range.interval('H').toArray();
    list.length.should.equal(745);
    list[0].toMoment().format(`${format} HH:mm`).should.be.equal(`${start} 00:00`);
    list[list.length - 1].toMoment().format(`${format} HH:mm`).should.be.equal(`${end} 00:00`);

    list = range.interval('m').toArray();
    list.length.should.equal(44641);
  });

  it('able to create basic range with interval', () => {
    let list;

    const range = new Range('2016-01-01', '2016-02-01');

    list = range.interval('day', 2).toArray();
    list.length.should.equal(16);

    list = range.interval('M', 2).toArray();
    list.length.should.equal(1);
  });

  it('able to convert to moment and date list', () => {
    let list;

    const range = new Range('2016-01-01', '2016-02-01');

    list = range.interval().toArray().map(li => (li instanceof Util).should.equal(true));
    list.length.should.equal(32);

    list = range.interval().toMomentArray().map(li => (li instanceof moment).should.equal(true));
    list.length.should.equal(32);

    list = range.interval().toDateArray().map(li => (li instanceof Date).should.equal(true));
    list.length.should.equal(32);
  });
});
