import moment from 'moment-timezone';
import Range from './range';

export default class DateUtil {

  constructor(input, { format, timezone } = {}) {
    let mom;

    if (input instanceof DateUtil) mom = input.toMoment();
    if (input instanceof Date) mom = moment(input);
    if (input instanceof moment) mom = input;
    if (typeof input === 'string') mom = DateUtil.fromString(input, format).toMoment();

    if (timezone) mom = mom.tz(timezone);

    this.mom = mom;
  }

  toDate(cb) {
    const date = new Date(this.mom.valueOf());
    if (DateUtil.validate(date) === false) throw new Error('date is not valid');

    let result;

    if (typeof cb === 'function') {
      const newDate = cb(date);

      if (DateUtil.validate(newDate) === false) throw new Error('new date is not valid');

      result = new DateUtil(newDate);
    } else {
      result = date;
    }

    return result;
  }

  toMoment(cb) {
    let result;

    if (typeof cb === 'function') {
      const newMom = cb(this.mom);

      if (newMom.isValid() !== true) throw new Error('new moment object is not valid');

      result = new DateUtil(newMom);
    } else {
      result = this.mom.clone();
    }

    return result;
  }

  clone() {
    return new DateUtil(this);
  }

  startOf(granularity) {
    const newMom = this.mom.clone().startOf(granularity);
    return new DateUtil(newMom);
  }

  endOf(granularity) {
    const newMom = this.mom.clone().endOf(granularity);
    return new DateUtil(newMom);
  }

  convert(timezone) {
    return new DateUtil(this.mom, timezone);
  }

  static range(start, end) {
    return new Range(start, end);
  }

  static fromString(string, format = 'YYYY-MM-DD HH:mm:ss', timezone) {
    let mom;

    switch (string) {
      case 'yesterday':
        mom = moment().add(-1, 'd').startOf('day');
        break;

      default:
        mom = moment(string, format);
    }

    if (timezone) mom = mom.tz(timezone);

    if (mom.isValid() === false) throw new Error('date is not valid');

    return new DateUtil(mom, format, timezone);
  }

  static validate(d) {
    let result;

    if (Object.prototype.toString.call(d) === '[object Date]') {
      result = !isNaN(d.getTime());
    } else {
      result = false;
    }

    return result;
  }

}
