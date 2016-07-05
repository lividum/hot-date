import Util from './util';

export default class DateRange {

  constructor(start, end) {
    this.start = new Util(start);
    this.end = new Util(end);
    this.list = [];
  }

  interval(granularity = 'd', interval = 1) {
    // list of Util
    const list = [];

    // set start and end
    const start = this.start.startOf(granularity);
    const end = this.end.endOf(granularity);
    let cursor = start.clone();

    while (cursor.toDate() < end.toDate()) {
      list.push(cursor);
      cursor = cursor.clone().toMoment(moment => moment.add(interval, granularity));
    }

    this.list = list;

    return this;
  }

  toArray(format) {
    const newList = [];

    this.list.forEach(li => {
      switch (format) {
        case 'date':
          newList.push(li.toDate());
          break;
        case 'moment':
          newList.push(li.toMoment());
          break;
        default:
          newList.push(li);
      }
    });

    return newList;
  }

  toDateArray() {
    return this.toArray('date');
  }

  toMomentArray() {
    return this.toArray('moment');
  }

}
