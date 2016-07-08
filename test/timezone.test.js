import Util from '../src/util';

describe('Util Timezone Functionality', () => {
  it('able to parse string with default format and custom timezone', () => {
    const mom = new Util('2015-03-01', { timezone: 'Asia/Jakarta' }).toMoment();

    mom.format('DD').should.be.equal('01');
    mom.format('MM').should.be.equal('03');
    mom.format('YYYY').should.be.equal('2015');
    mom.format('z').should.be.equal('WIB');
  });
});
