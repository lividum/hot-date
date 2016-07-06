import RawUtil from '../src/util';
import moment from 'moment-timezone';

describe('Util Library', () => {
  let Util;

  before(() => {
    class UtilClass extends RawUtil {
      constructor(input, format = 'YYYY-MM-DD', timezone = 'Asia/Jakarta') {
        super(input, format, timezone);
      }
    }

    Util = UtilClass;
  });

  it('able to parse string with default format', () => {
    const mom = new Util('2015-03-01').toMoment();

    mom.format('z').should.be.equal('WIB');
    mom.format('DD').should.be.equal('01');
    mom.format('MM').should.be.equal('03');
    mom.format('YYYY').should.be.equal('2015');
  });

  it('able to parse string with default format but different non-alphanumberic ', () => {
    const mom = new Util('2015/03/01').toMoment();

    mom.format('z').should.be.equal('WIB');
    mom.format('DD').should.be.equal('01');
    mom.format('MM').should.be.equal('03');
    mom.format('YYYY').should.be.equal('2015');
  });

  it('able to parse string with custom format', () => {
    const format = 'YYYY-MM-DD HH:mm';
    const mom = new Util('2015-03-01 15:03', format).toMoment();

    mom.format('z').should.be.equal('WIB');
    mom.format('DD').should.be.equal('01');
    mom.format('MM').should.be.equal('03');
    mom.format('YYYY').should.be.equal('2015');
    mom.format('HH').should.be.equal('15');
    mom.format('mm').should.be.equal('03');
  });

  it('able to parse string with custom format from static method', () => {
    const format = 'YYYY-MM-DD HH:mm';
    const mom = Util.fromString('2015-03-01 15:03', format, 'Asia/Jakarta').toMoment();

    mom.format('z').should.be.equal('WIB');
    mom.format('DD').should.be.equal('01');
    mom.format('MM').should.be.equal('03');
    mom.format('YYYY').should.be.equal('2015');
    mom.format('HH').should.be.equal('15');
    mom.format('mm').should.be.equal('03');
  });

  it('throw error when given string is not valid', () => {
    /* eslint no-undef: 0 */
    expect(() => new Util('string that is not date')).to.throw(Error);
  });

  it('easy to transform from date to moment and vice versa', () => {
    const input = '2013-01-23';
    const obj = new Util(input);

    const date = obj.toDate();
    Util.validate(date).should.be.equal(true);
    (date instanceof Date).should.be.equal(true);

    const mom = obj.toMoment();
    mom.format('YYYY-MM-DD').should.be.equal(input);
    (mom instanceof moment).should.be.equal(true);
  });

  it('able to create date Util from date Util', () => {
    const date = new Util('2016-01-01');
    const date2 = new Util(date);

    (date.toDate().getTime() === date2.toDate().getTime()).should.be.equal(true);
  });

  it('able to modify moment object', () => {
    const mom = new Util('2012-03-04').toMoment(mom2 => mom2.add(1, 'd')).toMoment();

    mom.format('DD').should.be.equal('05');
  });

  it('able to modify date object', () => {
    const mom = new Util('2012-03-04').toDate(date2 => {
      date2.setMonth(0);
      return date2;
    }).toMoment();

    mom.format('MM').should.be.equal('01');
  });

  it('able to get start of time', () => {
    let mom;

    const date = new Util('2015-02-03 15:09', 'YYYY-MM-DD HH:mm');
    mom = date.startOf('Y').toMoment();

    mom.format('YYYY').should.equal('2015');
    mom.format('MM').should.equal('01');
    mom.format('DD').should.equal('01');
    mom.format('HH').should.equal('00');
    mom.format('mm').should.equal('00');
    mom.format('s').should.equal('0');
    mom.format('z').should.equal('WIB');

    // invalid moment
    mom = date.startOf('just string').toMoment();

    mom.format('YYYY').should.equal('2015');
    mom.format('MM').should.equal('02');
    mom.format('DD').should.equal('03');
    mom.format('HH').should.equal('15');
    mom.format('mm').should.equal('09');
    mom.format('s').should.equal('0');
    mom.format('z').should.equal('WIB');
  });

  it('able to get end of time', () => {
    let mom;

    const date = new Util('2015-02-03 15:09', 'YYYY-MM-DD HH:mm');

    mom = date.endOf('Y').toMoment();

    mom.format('YYYY').should.equal('2015');
    mom.format('MM').should.equal('12');
    mom.format('DD').should.equal('31');
    mom.format('HH').should.equal('23');
    mom.format('mm').should.equal('59');
    mom.format('s').should.equal('59');
    mom.format('z').should.equal('WIB');

    // invalid moment
    mom = date.endOf('just string').toMoment();

    mom.format('YYYY').should.equal('2015');
    mom.format('MM').should.equal('02');
    mom.format('DD').should.equal('03');
    mom.format('HH').should.equal('15');
    mom.format('mm').should.equal('09');
    mom.format('s').should.equal('0');
    mom.format('z').should.equal('WIB');
  });

  describe('Pre defined string', () => {
    it('able to parse yesterday', () => {
      const now = moment();

      const mom = new Util('yesterday').toMoment();

      mom.format('z').should.be.equal('WIB');
      mom.format('DD').should.be.equal(now.add(-1, 'd').format('DD'));
      mom.format('MM').should.be.equal(now.format('MM'));
      mom.format('YYYY').should.be.equal(now.format('YYYY'));
    });
  });
});
